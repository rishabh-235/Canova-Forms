import CreateFormSideBar from "../../components/CreateFormSideBar";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useGetFormQuery } from "../../redux/slices/api/form.api";
import { useDispatch } from "react-redux";
import { setForm } from "../../redux/slices/state/formstateslice";
import { useEffect } from "react";
function CreateFormMainPage() {
  const location = useLocation();
  const isPreviewPage = location.pathname.includes("/preview");
  const { id } = useParams();
  const { data: formData, error, isLoading } = useGetFormQuery(id);
    const dispatch = useDispatch();
    useEffect(() => {
      if (formData) {
        dispatch(setForm(formData.form));
      }
    }, [formData, error, isLoading]);
  return (
    <div className="main-page-container">
      {!isPreviewPage && <CreateFormSideBar />}
      <Outlet />
    </div>
  );
}
export default CreateFormMainPage;



