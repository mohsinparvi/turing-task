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
      cache: "no-store",
      next: { revalidate: 60 },
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

  const data = await response.json();

  return data;
};

export { getCallData };
