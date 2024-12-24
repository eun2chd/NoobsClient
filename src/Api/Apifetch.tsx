const apiCallFetch = async (
  url: string,
  method = "GET",
  data: null | undefined | object = null
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const config: RequestInit = {
      method, // GET, POST 등의 요청 방식
      headers, // 헤더
      credentials: "include", // 쿠키와 인증 정보를 포함
    };

    // GET 요청일 경우 쿼리 파라미터 설정
    if (method.toLowerCase() === "get" && data) {
      const urlParams = new URLSearchParams(data as Record<string, string>).toString();
      url = `${url}?${urlParams}`;
    } else if (data) {
      // POST 요청일 경우 body에 데이터 포함
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("API call error", error);
    throw error;
  }
};

export default apiCallFetch;

