import { getCookie } from "cookies-next";

const getCallData = async (
  offset: number = 0,
  limit: number = 10,
  filter: string = "",
  sort: string = "desc"
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/calls?offset=${offset}&limit=${limit}&filter=${filter}&sort=${sort}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const { data, error } = await response.json();
  console.log("error", error);
  return data;
};

export { getCallData };
