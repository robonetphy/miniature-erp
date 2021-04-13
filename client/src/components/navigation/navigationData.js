import DescriptionIcon from "@material-ui/icons/Description";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import PeopleIcon from "@material-ui/icons/People";
import SubjectIcon from "@material-ui/icons/Subject";
import ReplyIcon from "@material-ui/icons/Reply";
import GavelIcon from "@material-ui/icons/Gavel";
/**
 * Navigation routes for navigation bar.
 */
export const navigationRoutes = [
  {
    Logo: DescriptionIcon,
    navigateTo: "/purchase",
    title: "Purchase",
  },
  {
    Logo: AllInboxIcon,
    navigateTo: "/inventory",
    title: "Inventory",
  },
  {
    Logo: GavelIcon,
    navigateTo: "/breakage",
    title: "Breakage",
  },
  {
    Logo: ReplyIcon,
    navigateTo: "/return",
    title: "Return",
  },
  {
    Logo: StoreMallDirectoryIcon,
    navigateTo: "/company",
    title: "Company",
  },
  {
    Logo: PeopleIcon,
    navigateTo: "/merchant",
    title: "Merchant",
  },
  {
    Logo: SubjectIcon,
    navigateTo: "/invoice",
    title: "Invoice",
  },
];
