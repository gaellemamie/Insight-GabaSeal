# 📚 Application Routes Documentation (Insight)

---

## 🌐 Public Routes

### 🏠 Home (`/`)

**Path:** `/`
**Description:** Welcome page with platform overview and main navigation.

### 🔐 Authentication

* **Login (`/login`)**
  **Path:** `/login`
  **Description:** Sign in to access your institution's dashboard (supports Email/password and Pfx).

* **Forgot Password (`/forgot-password`)**
  **Path:** `/forgot-password`
  **Description:** Recover access to your account by resetting your password.

### 📖 Documentation (`/documentation`)

**Path:** `/documentation`
**Description:** Full platform usage guide with instructions and tutorials.

### 📞 Contact (`/contact`)

**Path:** `/contact`
**Description:** Reach out to our support team for assistance or inquiries.

### 📋 Guidelines (`/guidelines/[type]`)

**Path:** `/guidelines/[type]`
**Description:** View specific onboarding or usage guidelines tailored to different institution types.

---

## 🏢 Institution Dashboard (`/dashboard`)

For institution users (e.g., schools, government bodies, hospitals) to manage documents and operations.

### 📊 Main Dashboard

**Path:** `/dashboard`
**Description:** Institution’s central control panel for accessing tools and insights.

### 📂 Document Management

**Path:** `/dashboard/documents`
**Description:** Upload, edit, and manage all institutional documents.

### 📚 Collections

**Path:** `/dashboard/collections`
**Description:** Organize documents into collections for better structure and access.

### ✍️ Bulk Sign

**Path:** `/dashboard/bulk-sign`
**Description:** Digitally sign multiple documents simultaneously.

### 👥 User Management (Managers)

**Path:** `/dashboard/managers`
**Description:** Manage staff members and delegate administrative roles.

### 🔔 Notifications

**Path:** `/dashboard/notifications`
**Description:** Receive and manage alerts and important updates.

### ⚙️ Settings

**Path:** `/dashboard/settings`
**Description:** Update your institution’s preferences, branding, and system settings.

---

## 👑 Admin Panel (`/admins`)

For system administrators to manage the entire ecosystem.

### 📊 Admin Dashboard

**Path:** `/admins`
**Description:** Overview of system activity, stats, and high-level controls.

### 🏛️ Institutions

**Path:** `/admins/institutions`
**Description:** Register new institutions, edit profiles, and manage institution access.

### ⚙️ Admin Settings

**Path:** `/admins/settings`
**Description:** Control global system settings, defaults, and configurations.

---

## 🔍 Document Verification (Public Route)

A universal verification system accessible by anyone to confirm document authenticity.

### 🔗 Verification URL Structure

**Format:**
`/[institution]/verify/[collection]/[documentId]`

**Example:**
`/google/verify/aicertificate2024/235dsfsdgd`

* `google` → Institution issuing the document
* `aicertificate2024` → Type of document or certificate (collection)
* `235dsfsdgd` → Unique document ID

### ✅ How It Works:

* Anyone with the verification link can verify a document
* No login required
* Displays document details and verification status
* Confirms the issuing institution

### 🧾 Use Cases:

* Employers verifying job applicant credentials
* Schools validating student academic records
* Government agencies checking official submissions
* Third-party entities needing proof of document authenticity

---