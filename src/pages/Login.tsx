// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const CLIENT_ID: string | undefined = import.meta.env.VITE_GOOGLE_CLIENT_ID; // .env에서 가져오기

// const Login = () => {
//   return (
//     <GoogleOAuthProvider clientId={CLIENT_ID ?? ""}>  {/* ✅ 기본값 "" 추가 */}
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h1 className="text-2xl font-bold mb-6">반가워요!</h1>
//         <p className="text-gray-600 mb-4">Google 계정으로 로그인해주세요.</p>
        
//         <GoogleLogin
//           onSuccess={(credentialResponse) => {
//             console.log("Google Login Success:", credentialResponse);
//             const accessToken = credentialResponse.credential;
            
//             localStorage.setItem("accessToken", accessToken);
//             window.location.href = "/sign-up";
//           }}
//           onError={() => {
//             console.log("Google Login Failed");
//           }}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Login;

const Login = () => {
  const handleLogin = () => {
    window.location.href = "https://aether.asia/oauth2/authorization/google";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">반가워요!</h1>
      <p className="text-gray-600 mb-4">Google 계정으로 로그인해주세요.</p>
      <button
        onClick={handleLogin}
        className="bg-white border rounded-lg px-4 py-2 flex items-center shadow-md"
      >
        <img src="/google-icon.png" alt="Google Logo" className="w-6 h-6 mr-2" />
        Google 계정으로 로그인
      </button>
    </div>
  );
};

export default Login;
