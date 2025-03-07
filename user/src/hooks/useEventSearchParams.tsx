import { useSearchParams } from "react-router-dom";

const useEventSearchParams = ({
  addKey = "add",
  detailsKey = "details",
  editKey = "edit",
  removeKey = "remove",
} = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const add = () => {
    searchParams.set("mode", addKey);
    setSearchParams(searchParams);
  };

  const edit = (id: string) => {
    searchParams.set("id", id);
    searchParams.set("mode", editKey);
    setSearchParams(searchParams);
  };
  const details = (id: string) => {
    searchParams.set("id", id);
    searchParams.set("mode", detailsKey);
    setSearchParams(searchParams);
  };
  const remove = (id: string) => {
    searchParams.set("id", id);
    searchParams.set("mode", removeKey);
    setSearchParams(searchParams);
  };

  return { edit, details, remove, add };
};
export default useEventSearchParams;
