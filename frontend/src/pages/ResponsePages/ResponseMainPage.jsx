import { Outlet, useParams } from "react-router-dom";
import { useGetResponseFormQuery } from "../../redux/slices/api/form.api";
import { useDispatch } from "react-redux";
import { setResponseForm } from "../../redux/slices/state/formstateslice";
import { useEffect } from "react";
function ResponseMainPage() {
  const { responseFormId } = useParams();
  const dispatch = useDispatch();
  const { data: form } = useGetResponseFormQuery(responseFormId);
  useEffect(() => {
    if (form) {
      dispatch(setResponseForm(form?.form));
    }
  }, [form, dispatch]);
  return <div>
    <Outlet />
  </div>;
}
export default ResponseMainPage;



