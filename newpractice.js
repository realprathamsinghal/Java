// Don't change this function (It simulates a slow server)
const fakeDatabaseCall = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Iron Man"), 2000);
    });
};

// --- YOUR CODE STARTS HERE ---

// 1. Create your async function
async function displayUserProfile() {
    console.log("Loading...");
    const user = await fakeDatabaseCall();
    console.log(user);
}

// 2. Call your function
displayUserProfile();