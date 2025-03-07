import { useSearchParams } from "react-router-dom";

function usePageNumberSearchParam(key = "p") {
  const [searchParams] = useSearchParams();
  try {
    const pageNumber = Number(searchParams.get(key) ?? 1);
    return pageNumber;
  } catch (err) {
    return 1;
  }
}
export default usePageNumberSearchParam;
