import { useLocation, useParams, useNavigate } from "react-router-dom";

export const withRouter = Component => props => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    return <Component location={location} params={params} navigate={navigate} {...props} />;
};