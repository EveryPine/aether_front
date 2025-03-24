import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthInterceptor = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/auth/success") {
            console.log("✅ /auth/success 감지됨, JSON 처리 시작");

            try {
                const responseText = document.body.innerText; // 현재 페이지의 JSON 데이터 가져오기
                const data = JSON.parse(responseText); // JSON 파싱

                if (data.code === 200 && data.result) {
                    const { accessToken, email, username } = data.result;

                    if (accessToken && email && username) {
                        console.log("✅ 로그인 성공! 로컬 스토리지 저장 후 /sign-up으로 이동");

                        localStorage.setItem("accessToken", accessToken);
                        localStorage.setItem("email", email);
                        localStorage.setItem("username", username);

                        // 즉시 /sign-up으로 이동
                        navigate("/sign-up", { replace: true });
                    } else {
                        console.error("⚠️ 필수 데이터 없음. 로그인 실패", data);
                        navigate("/login");
                    }
                } else {
                    console.error("⚠️ 로그인 응답 오류:", data.message);
                    navigate("/login");
                }
            } catch (error) {
                console.error("❌ 인증 데이터 가져오기 실패:", error);
                navigate("/login");
            }
        }
    }, [location, navigate]);

    return null; // UI 요소를 렌더링하지 않음
};

export default AuthInterceptor;
