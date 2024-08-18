const Auth = () => {

    const loginWithGoogle = () => {
        window.open("http://localhost:6005/auth/google/callback", "_self");
    }
    return <>
        <div className={"h-[100vh] w-[100vw] flex justify-center items-center "}>
            <button className={"bg-blue-950 p-5 text-white rounded-xl w-[60vw] hover:bg-blue-900"}
                    onClick={loginWithGoogle}>
                Sign in with Google
            </button>
        </div>
    </>
}


export default Auth;