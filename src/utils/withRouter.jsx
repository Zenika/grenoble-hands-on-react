import { useLocation, useParams, useNavigate } from "react-router-dom";

export const withRouter = Component => props => {
    const location = useLocation();
    const match = { params: useParams() };
    const navigate = useNavigate();
    return <Component location={location} match={match} history={navigate} {...props} />;
};