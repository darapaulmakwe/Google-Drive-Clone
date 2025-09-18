<h1>Store-it: Your Cloud Storage Solution</h1>
Seamlessly store, manage, and access your files from anywhere, with the power of a modern, secure cloud platform.

<h2>Overview</h2>
<p>store-it is a full-featured cloud storage application, a modern take on Google Drive. Built to provide a secure and intuitive file management experience, it empowers users to organize, share, and access their files from any device. This project demonstrates a complete full-stack workflow, from a meticulously crafted design to robust server-side logic and seamless client-side performance.</p>

<h2>Key Features</h2>
<li>Comprehensive File Management: Upload, organize, rename, and delete files and folders with a familiar and intuitive interface.</li>

<li>Secure File Handling: Implemented with secure server-side logic using Appwrite to ensure data integrity and user authentication.</li>

<li>Real-time Updates: Experience a dynamic interface that reflects changes instantly, thanks to real-time database syncing.</li>

<li>Collaborative Design: Enjoy a consistent, responsive, and visually appealing experience across devices, designed meticulously in Figma and implemented with Tailwind CSS and Shadcn UI components.</li>

<li>Robust Authentication: Secure user sign-up and login functionality powered by Appwrite.</li>

<h2>Technologies Used</h2>
<li>Frontend: Next.js, Tailwind CSS, Shadcn UI</li>

<li>Design: Figma</li>

<li>Backend: Appwrite (for server-side logic and database)</li>

<li>Version Control: Git, GitHub</li>

<h2>Challenges and Learning</h2>
<p>The primary challenge was managing the server-side logic for file operations, including uploads, deletions, and real-time updates.</p>
<p>Overall, integrating Appwrite as the backend was a valuable learning experience in managing a powerful, self-hosted platform and understanding how to connect front-end actions to back-end services.</p>
<p>This project solidified my full-stack development skills and my ability to build a secure and scalable application from concept to execution.</p>


## Steps to run the application
<h2>Step 1: Set Up Appwrite</h2>
Before you can run the app, you need to set up an Appwrite instance and create the necessary projects and collections for your database.

<li>Install Appwrite: You can install Appwrite locally using Docker. Follow the official Appwrite Docker installation guide.</li>

<li>Create a New Project: Once Appwrite is running, go to your console and create a new project.</li>

<li>Configure Collections and Storage: In your new project, you'll need to set up a database and collections to store file metadata (such as file names, user IDs, and permissions). You'll also need to set up the storage bucket to hold the actual files.</li>

<h2>Step 2: Clone the Project and Install Dependencies</h2>
This is where you'll get the code onto your local machine.

Clone the Repository: Use Git to clone the project from your GitHub repository.

```bash
git clone https://github.com/your-username/store-it.git
```
Navigate to the Project Directory:

```bash
cd store-it
```

Install Dependencies: Use a package manager like npm or yarn to install all the necessary packages for Next.js and other libraries.

```bash
npm install
# or
yarn install
```

<h2>Step 3: Configure Environment Variables</h2>

<li>Create a .env.local file: In the root directory of your project, create a new file named .env.local.</li>

<li>Add Appwrite Credentials: Copy your Appwrite project credentials from the Appwrite console and paste them into the .env.local file in the following format.</li>


```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
NEXT_PUBLIC_APPWRITE_BUCKET=
NEXT_APPWRITE_KEY=
```

<h2>Step 4: Run the Development Server</h2>
With everything set up, you're ready to run the application.

Start the Next.js Server: Use the dev script to start the development server.

Bash

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
