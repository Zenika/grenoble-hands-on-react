import React from "react";
import { NavigateFunction } from "react-router";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Location, State } from "history";

export interface IInjectedProps {
  location: Location<State>;
  params: Record<string, string>;
  navigate: NavigateFunction;
}

export const withRouter = (Component: typeof React.Component) => (
  props: any
) => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  return (
    <Component
      location={location}
      params={params}
      navigate={navigate}
      {...props}
    />
  );
};
