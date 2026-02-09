
export const registerUser = async (data) => {
    try{
        const res = await api.post("/auth/register", data);
        console.log("userdata:",res.data);
        return res.data;

    
        
    }catch(err){
        console.error(err);

    }

}


export const loginUser = async (data) => {
    try{
        const res = await api.post("/auth/login", data);
        localStorage.setItem("token", res.data.token);
        return res.data;

    
        
    }catch(err){
        console.error(err);
    }

}

export const logoutUser = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
}

export const isAuthenticated = () => !!localStorage.getItem("token");
