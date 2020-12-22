/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import PeopleIcon from "@material-ui/icons/People";
import DomainIcon from "@material-ui/icons/Domain";

export default [
  {
    title: "Seções",
    pages: [
      {
        title: "Dashboard",
        href: "/overview",
        icon: HomeIcon,
      },
      {
        title: "Usuários",
        href: "/usuarios",
        icon: PeopleIcon,
      },
    ],
  },
];
