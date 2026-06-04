# **API Documentation – User Registration (New Flow)**

This document provides comprehensive documentation for the user registration and wellbeing pillar APIs built for the Woliba platform.

---

## **Base URL**

```
https://dev.woliba.io/v1/
```

---

## **1\. Verify By Company Name and Password**

**Endpoint:**

```
POST /verify-by-company-name-and-password
```

**Description:** Verify the user by company name and password  
 **Request Body Parameters:**

**Sample Company name and password** 

* Name: **Woliba**  
* Pass: **Woliba@123\!**

| Parameter | Type | Required | Description |
| :---- | ----- | ----- | ----- |
| company\_name | string | Yes | Company Name |
| password | string | Yes | Company Password |

**Request Example:**

```json
{
   "company_name": "woliba",
   "password": "Woliba@123!"
}
```

**Success Response (200 OK):**

```json
{
    "status": "success",
    "data": [
        {
            "id": 12,
            "company_name": "Alpine Intel",
            "password": "AlpineWellness",
            "spouse_or_dependent": 1,
            "show_spouse": 1,
            "show_dependent": 1
        }
    ]
}
```

## **2\. Save User Details And Send Otp**

**Endpoint:**

```
POST /save-user-details-and-send-otp
```

**Description:** Verify the user by company name and password  
 **Request Body Parameters:**

| Parameter | Type | Required | Description |
| :---- | ----- | ----- | ----- |
| company\_id | int | Yes | Company id |
| mail | string | Yes | User Email  |
| fname | string | Yes | User first name |
| lname | string | Yes | User's last name |

**Request Example:**

```json
{
   "company_id": 1,
   "mail":"woliba-user-2@woliba.io",
   "fname":"shubham",
   "lname":"pardeshi"
}
```

**Success Response (200 OK):**

```json
{
    "status": "success",
    "data": {
        "message": "OTP sent successfully! Please check your email for OTP.",
        "token": "QVJQZ25KRENBelpaRXRjOXp5OERDcWF5R0ZUVHJTNnY="
    }
}
```

---

## 

## 

## **3\. Verify OTP for User Registration**

**Endpoint:**

```
POST /verify-otp-for-user-registration
```

**Description:**  
 Verifies the 6-digit OTP sent to the user's email. The OTP will be valid for only 10 minutes. If 

**Request Example:**

```json
{
    "otp": "123456",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Success Response (200 OK):**

```json
{
    "status": true,
    "data": "OTP verified successfully!"
}
```

---

## **5\. Get Wellbeing Pillars**

**Endpoint:**

```
GET /get-wellbeing-pillars/{language_id?}
```

**Description:**  
 Retrieves all wellbeing pillars available in the system, localized by language ID.

**Request Example:**

```
GET /v1/get-wellbeing-pillars/1
```

**Success Response (200 OK):**

```json
{
    "status": true,
    "data": [
        {
            "id": 1,
            "pillar_title": "Physical Wellbeing",
            "description": "Focus on physical health, fitness, and nutrition",
            "is_active": 1
        }
    ]
}
```

---

## **6\. View Wellness Interest**

## **Endpoint:**

```
GET /viewWellnessInterest
```

## **Description:** Retrieves the list of all available wellness interest topics for a user. Typically used for populating wellness interest options during registration or profile setup.

## **Request Headers:**

| Header | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| Accept | string | Yes | application/json |
| Origin | string | Yes | CORS origin URL |
| Referer | string | Yes | Originating page URL |

## **Example cURL:**

```
curl 'https://staging.api.gcp.woliba.io/v1/viewWellnessInterest' \
  -H 'Accept: application/json' \
  -H 'Origin: https://staging.gcp.woliba.io' \
  -H 'Referer: https://staging.gcp.woliba.io/'
```

## **Success Response (200 OK):**

```
{
  "status": true,
  "data": [
    {
      "id": 1,
      "name": "Acrobatics",
      "interest_type": "Individual Sports",
      "created_at": "2018-10-03 03:56:40",
      "updated_at": "2021-12-29 10:06:51",
      "interest_image": "aoi_icons/acrobatics.png",
      "background_image": "log-workout/acrobatics.png",
      "show_distance": 0,
      "interest_icon": "interest_icons/acrobatics.png",
      "background_color": "#92A4DA",
      "interest_color_icon": "interest_icons/acrobatics_color_teal.png",
      "interest_white_icon": "interest_icons/acrobatics_color_white.png"
    },
    {
      "id": 2,
      "name": "Aerial Arts",
      "interest_type": "Individual Sports",
      "created_at": "2018-10-03 03:56:40",
      "updated_at": "2021-12-29 10:06:51",
      "interest_image": "aoi_icons/aerial_arts.png",
      "background_image": "log-workout/aerial_arts.png",
      "show_distance": 0,
      "interest_icon": "interest_icons/aerial_arts.png",
      "background_color": "#DA92C8",
      "interest_color_icon": "interest_icons/aerial_arts_color_teal.png",
      "interest_white_icon": "interest_icons/aerial_arts_color_white.png"
    }
  ]
}
```

## **Error Response (500 Internal Server Error):**

```
{
  "status": false,
  "error": "Something went wrong"
}
{
  "status": false,
  "error": "Something went wrong"
}
```

## Note: Cloudfront Base URL to show the wellness interest icon

```
https://d38xnw03cl4zf4.cloudfront.net
```

## ---

## **7\. Complete User Registration (New)**

## **Endpoint:**

```
POST /user-registration
```

## **Description:** Registers a new user by collecting personal, preference, and health-related data. Upon success, the user is authenticated and a token is issued.

## **Request Headers:**

| Header | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| Content-Type | string | Yes | application/json |

## **Request Body Example:**

```
{
    "fname": "John",
    "lname": "Doe",
    "password": "securepassword123",
    "time_zone": "America/New_York",
    "token": "encrypted_email_token",
    "areas_of_interest": [1, 2, 3],
    "wellbeing_pillars": [1, 2, 3],
    "accepted_privacy_policy": true,
    "birthday": "1990-01-15",
    "phone_number": "+1234567890",
    "user_type": 0,
    "gender": "Male",
    "profile_image": "base64_encoded_image",
    "language_id": 1,
    "smoke": "no",
    "exercise_day_per_week": "3-4 days",
    "average_sleep_per_night": "7-8 hours",
    "average_water_intake": "8+ glasses",
    "pain_experience": "rarely",
    "prescription_intake": "none",
    "physical_exam_frequency": "annually"
}
```

## 

## **8\. Send / Resend OTP for User Registration**

**Endpoint:**

```
POST /send-otp-for-user-registration
```

**Description:**  
 Sends a 6-digit OTP to the user's email address for registration verification.

**Request Example:**

```json
{
    "email": "john.doe@company.com"
}
```

**Success Response (200 OK):**

```json
{
    "status": true,
    "data": {
        "message": "OTP sent successfully! Please check your email for OTP.",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
    }
}
```

## 

## **Required Parameters:**

| Parameter | Type | Description |
| :---- | :---- | :---- |
| fname | string | First name |
| lname | string | Last name |
| password | string | Password (min 6 characters) |
| time\_zone | string | Timezone (IANA format) |
| token | string | OTP verification token |
| areas\_of\_interest | array | Area of interest IDs |
| wellbeing\_pillars | array | Exactly 3 wellbeing pillar IDs |
| accepted\_privacy\_policy | boolean | Must be true |
| birthday | date | Format Y-m-d |
| phone\_number | string | Contact number |
| user\_type | integer | 0 \= Employee, 1 \= Dependent, etc. |

## **Success Response (200 OK):**

```
{
    "status": "success",
    "data": {
        "token": "user_auth_token",
        "user": {
            "uid": 12345,
            "fname": "John",
            "lname": "Doe",
            "email": "john.doe@example.com",
            "user_name": "John.Doe_12345",
            "company_id": 1,
            "is_email_verified": 1
        }
    }
}
```

## 

## **Error Response (400 Bad Request):**

```
{
    "status": "failed",
    "error": "Email already registered."
}
```

---

## **Error Codes**

| Error Code | Description |
| ----- | ----- |
| \-419 | Invalid OTP |
| \-420 | OTP Expired |
| \-430 | Failed to send OTP |
| \-500 | Something went wrong |
| \-102 | Email already registered |
| \-419 | Invalid OTP |
| \-431 | Session expired (OTP expired) |

---

## **Authentication**

Some endpoints may require authentication depending on your application's security requirements.

---

## **Notes**

* Token encryption using AES

* OTP expires in 10 minutes

* Email format validation enforced  
* Complete the registration within 10 minutes after OTP verification, else ask the user to verify again and  redirect to the verify OTP screen and call send OTP API in backend

* Wellbeing pillars support localization

* Data privacy is maintained per regulations

---

## **Support**

For technical support or questions:

* Email: shubham.pardeshi@woliba.com

