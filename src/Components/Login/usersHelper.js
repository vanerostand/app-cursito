const registerUser = async (payload) => {
  try {
    const response = await fetch('http://localhost:3500/users/register', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.log("Error: ", error);
  }
}

const loginUser = async (payload) => {
  try {
    const response = await fetch('http://localhost:3500/users/login', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.log("Error: ", error);
  }
}

export { registerUser, loginUser };