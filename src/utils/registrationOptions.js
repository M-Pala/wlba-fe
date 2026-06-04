import { toast } from "react-toastify";
import {
  getWellbeingPillars,
  getWellnessInterests,
} from "../api/registrationApi";
import {
  setError,
  setInterestOptions,
  setPillarOptions,
} from "../redux/registrationSlice";
import { getApiErrorMessage } from "./apiError";

const INTEREST_ICON_CDN = "https://d38xnw03cl4zf4.cloudfront.net";

const PILLAR_FALLBACK = [
  {
    id: 1,
    pillar_title: "Physical Wellbeing",
    description: "Focus on physical health, fitness, and nutrition",
  },
  {
    id: 2,
    pillar_title: "Emotional Wellbeing",
    description: "Manage stress and build emotional resilience",
  },
  {
    id: 3,
    pillar_title: "Social Wellbeing",
    description: "Strengthen relationships and community connections",
  },
  {
    id: 4,
    pillar_title: "Financial Wellbeing",
    description: "Build financial security and reduce money stress",
  },
  {
    id: 5,
    pillar_title: "Career Wellbeing",
    description: "Grow professionally and find purpose at work",
  },
];

const INTEREST_FALLBACK = [
  { id: 1, name: "Yoga", interest_type: "Individual Sports" },
  { id: 2, name: "Meditation", interest_type: "Other" },
  { id: 3, name: "Cycling", interest_type: "Wheel Sports" },
  { id: 4, name: "Swimming", interest_type: "Water Sports" },
  { id: 5, name: "Running", interest_type: "Individual Sports" },
];

function buildInterestIconUrl(path) {
  if (!path) return "";
  return `${INTEREST_ICON_CDN}/${path.replace(/^\//, "")}`;
}

function toInterestList(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data.flat();
  if (typeof data === "object") return Object.values(data);
  return [];
}

export function normalizeInterests(data) {
  return toInterestList(data).map((item) => ({
    id: item.id,
    label: item.name,
    interestType: item.interest_type || "Other",
    colorIcon: buildInterestIconUrl(item.interest_color_icon),
    whiteIcon: buildInterestIconUrl(item.interest_white_icon),
  }));
}

export function normalizePillars(data) {
  const items = Array.isArray(data) ? data.flat() : [];
  return items.map((item) => ({
    id: item.id,
    title: item.pillar_title,
    description: item.description || "",
  }));
}

export function preloadInterestIcons(items) {
  items.forEach((item) => {
    [item.colorIcon, item.whiteIcon].forEach((src) => {
      if (!src) return;
      const image = new Image();
      image.src = src;
    });
  });
}

export function groupInterestsByType(items) {
  const groups = items.reduce((acc, item) => {
    const type = item.interestType;
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

let interestsInflight = null;
let pillarsInflight = null;

export async function loadInterestOptions(dispatch, { notify = false } = {}) {
  if (!interestsInflight) {
    interestsInflight = (async () => {
      try {
        const result = await getWellnessInterests();
        const normalized = normalizeInterests(result?.data);
        dispatch(setInterestOptions(normalized));
        preloadInterestIcons(normalized);
        return { items: normalized, usedFallback: false };
      } catch {
        const fallback = normalizeInterests(INTEREST_FALLBACK);
        dispatch(setInterestOptions(fallback));
        preloadInterestIcons(fallback);
        return { items: fallback, usedFallback: true };
      }
    })().finally(() => {
      interestsInflight = null;
    });
  }

  const { items, usedFallback } = await interestsInflight;

  if (usedFallback && notify) {
    dispatch(setError("Could not fetch interests. Using local defaults."));
    toast.warning("Could not fetch interests. Using local defaults.");
  }

  return items;
}

export async function loadPillarOptions(dispatch, { notify = false } = {}) {
  if (!pillarsInflight) {
    pillarsInflight = (async () => {
      try {
        const result = await getWellbeingPillars(1);
        const normalized = normalizePillars(result?.data);
        dispatch(setPillarOptions(normalized));
        return { items: normalized, error: null, usedFallback: false };
      } catch (apiError) {
        const fallback = normalizePillars(PILLAR_FALLBACK);
        dispatch(setPillarOptions(fallback));
        return {
          items: fallback,
          error: getApiErrorMessage(
            apiError,
            "Could not load wellbeing pillars.",
          ),
          usedFallback: true,
        };
      }
    })().finally(() => {
      pillarsInflight = null;
    });
  }

  const { items, error, usedFallback } = await pillarsInflight;

  if (error && notify) {
    if (usedFallback) {
      toast.warning("Could not fetch pillars. Using local defaults.");
    } else {
      dispatch(setError(error));
      toast.error(error);
    }
  }

  return items;
}

export function resetPillarOptionsCache() {
  pillarsInflight = null;
}

export function prefetchRegistrationOptions(dispatch, options) {
  const tasks = [];

  if (!options.interests.length) {
    tasks.push(loadInterestOptions(dispatch));
  }

  if (!options.pillars.length) {
    tasks.push(loadPillarOptions(dispatch));
  }

  return Promise.all(tasks);
}
