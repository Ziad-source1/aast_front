// ==========================================
// AAST STUDENT UNION FRONTEND
// ==========================================


// ==========================================
// BACKEND URL
// ==========================================

const API_URL =
    "https://aast-delta.vercel.app";


// ==========================================
// GET STUDENT ID FROM FRONTEND URL
// ==========================================
//
// Example:
//
// https://aastfrontend.com/221006457
//
// pathname = "/221006457"
//
// student ID = "221006457"
// ==========================================

function getStudentID() {

    const path =
        window.location.pathname;


    // Remove "/" from beginning/end
    const id =
        path
            .replace(/^\/+|\/+$/g, "");


    return id;

}


// ==========================================
// ELEMENTS
// ==========================================

const homeSection =
    document.getElementById(
        "homeSection"
    );


const loadingSection =
    document.getElementById(
        "loadingSection"
    );


const errorSection =
    document.getElementById(
        "errorSection"
    );


const errorText =
    document.getElementById(
        "errorText"
    );


const studentSection =
    document.getElementById(
        "studentSection"
    );


const studentPhoto =
    document.getElementById(
        "studentPhoto"
    );


const studentName =
    document.getElementById(
        "studentName"
    );


const studentPosition =
    document.getElementById(
        "studentPosition"
    );


const studentID =
    document.getElementById(
        "studentID"
    );


const studentTeam =
    document.getElementById(
        "studentTeam"
    );


const studentBirthday =
    document.getElementById(
        "studentBirthday"
    );


// ==========================================
// SHOW / HIDE FUNCTIONS
// ==========================================

function hideAllSections() {

    homeSection.classList.add(
        "hidden"
    );

    loadingSection.classList.add(
        "hidden"
    );

    errorSection.classList.add(
        "hidden"
    );

    studentSection.classList.add(
        "hidden"
    );

}


// ==========================================
// SHOW HOME
// ==========================================

function showHome() {

    hideAllSections();

    homeSection.classList.remove(
        "hidden"
    );

}


// ==========================================
// SHOW LOADING
// ==========================================

function showLoading() {

    hideAllSections();

    loadingSection.classList.remove(
        "hidden"
    );

}


// ==========================================
// SHOW ERROR
// ==========================================

function showError(message) {

    hideAllSections();

    errorText.textContent =
        message;

    errorSection.classList.remove(
        "hidden"
    );

}


// ==========================================
// SHOW STUDENT
// ==========================================

function showStudent() {

    hideAllSections();

    studentSection.classList.remove(
        "hidden"
    );

}


// ==========================================
// GOOGLE DRIVE PHOTO
// ==========================================

function convertGoogleDriveURL(
    url
) {

    if (!url) {

        return null;

    }


    // Already direct/normal URL
    if (
        !url.includes(
            "drive.google.com"
        )
    ) {

        return url;

    }


    // ======================================
    // Format:
    //
    // https://drive.google.com/open?id=FILE_ID
    // ======================================

    const idParameter =
        url.match(
            /[?&]id=([^&]+)/
        );


    if (
        idParameter &&
        idParameter[1]
    ) {

        return (
            "https://drive.google.com/thumbnail" +
            "?id=" +
            encodeURIComponent(
                idParameter[1]
            ) +
            "&sz=w800"
        );

    }


    // ======================================
    // Format:
    //
    // https://drive.google.com/file/d/FILE_ID/view
    // ======================================

    const fileParameter =
        url.match(
            /\/file\/d\/([^/]+)/
        );


    if (
        fileParameter &&
        fileParameter[1]
    ) {

        return (
            "https://drive.google.com/thumbnail" +
            "?id=" +
            encodeURIComponent(
                fileParameter[1]
            ) +
            "&sz=w800"
        );

    }


    return url;

}


// ==========================================
// SET DEFAULT PHOTO
// ==========================================

function setDefaultPhoto() {

    // SVG placeholder generated locally
    // so there is no dependency on another website.

    const svg = `

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="500"
            viewBox="0 0 500 500"
        >

            <rect
                width="500"
                height="500"
                fill="#edf5fb"
            />

            <circle
                cx="250"
                cy="190"
                r="85"
                fill="#b9d7eb"
            />

            <path
                d="
                M100 450
                C120 330
                180 290
                250 290
                C320 290
                380 330
                400 450
                Z
                "
                fill="#b9d7eb"
            />

            <text
                x="250"
                y="475"
                text-anchor="middle"
                font-family="Arial"
                font-size="25"
                font-weight="bold"
                fill="#1261a0"
            >
                AAST
            </text>

        </svg>

    `;


    studentPhoto.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg);

}


// ==========================================
// SET STUDENT PHOTO
// ==========================================

function setStudentPhoto(
    photoURL
) {

    const convertedURL =
        convertGoogleDriveURL(
            photoURL
        );


    if (!convertedURL) {

        setDefaultPhoto();

        return;

    }


    studentPhoto.src =
        convertedURL;

}


// ==========================================
// PHOTO ERROR
// ==========================================

studentPhoto.addEventListener(
    "error",
    function () {

        setDefaultPhoto();

    }
);


// ==========================================
// DISPLAY STUDENT DATA
// ==========================================

function displayStudent(
    data
) {

    // --------------------------------------
    // Name
    // --------------------------------------

    studentName.textContent =
        data.Name || "N/A";


    // --------------------------------------
    // Position
    // --------------------------------------

    studentPosition.textContent =
        data.Positions || "N/A";


    // --------------------------------------
    // ID
    // --------------------------------------

    studentID.textContent =
        data.ID || "N/A";


    // --------------------------------------
    // Team
    // --------------------------------------

    studentTeam.textContent =
        data.Team || "N/A";


    // --------------------------------------
    // Birthday
    // --------------------------------------

    studentBirthday.textContent =
        data.Birthday || "N/A";


    // --------------------------------------
    // Photo
    // --------------------------------------

    setStudentPhoto(
        data.Photo
    );


    // --------------------------------------
    // Show profile
    // --------------------------------------

    showStudent();

}


// ==========================================
// API CALL
// ==========================================

async function loadStudent() {

    const id =
        getStudentID();


    // ======================================
    // ROOT DOMAIN
    // ======================================

    // https://aastfrontend.com/
    //
    // No ID
    //
    // Show welcome page.

    if (!id) {

        showHome();

        return;

    }


    // ======================================
    // VALIDATE ID
    // ======================================

    // Your IDs appear to be numeric.

    if (!/^\d+$/.test(id)) {

        showError(
            "The Student ID in this URL is not valid."
        );

        return;

    }


    // ======================================
    // SHOW LOADING
    // ======================================

    showLoading();


    try {


        // ==================================
        // BACKEND API
        // ==================================

        const apiURL =
            `${API_URL}/users/${encodeURIComponent(id)}`;


        console.log(
            "Requesting:",
            apiURL
        );


        // ==================================
        // FETCH
        // ==================================

        const response =
            await fetch(
                apiURL,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        // ==================================
        // TRY TO READ JSON
        // ==================================

        let result;


        try {

            result =
                await response.json();

        } catch (jsonError) {

            throw new Error(
                "Server returned an invalid response."
            );

        }


        // ==================================
        // HTTP ERROR
        // ==================================

        if (!response.ok) {

            showError(
                result.message ||
                "Student not found."
            );

            return;

        }


        // ==================================
        // API SUCCESS CHECK
        // ==================================

        if (
            !result ||
            result.success !== true ||
            !result.data
        ) {

            showError(
                result.message ||
                "Student information was not found."
            );

            return;

        }


        // ==================================
        // DISPLAY DATA
        // ==================================

        displayStudent(
            result.data
        );


    } catch (error) {

        console.error(
            "API request failed:",
            error
        );


        showError(
            "Unable to connect to the Student Union server. Please try again later."
        );

    }

}


// ==========================================
// RETURN HOME
// ==========================================

function goHome() {

    window.location.href = "/";

}


// ==========================================
// START APPLICATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadStudent();

    }
);
