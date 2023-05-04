import PrimeVue from "primevue/config";
import AutoComplete from "primevue/autocomplete";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import Button from "primevue/button";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import Carousel from "primevue/carousel";
import Chart from "primevue/chart";
import Checkbox from "primevue/checkbox";
import Chip from "primevue/chip";
import Chips from "primevue/chips";
import ColorPicker from "primevue/colorpicker";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService, {ConfirmationServiceMethods} from "primevue/confirmationservice";
import ContextMenu from "primevue/contextmenu";
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import Dropdown from "primevue/dropdown";
import Fieldset from "primevue/fieldset";
import FileUpload from "primevue/fileupload";
import Image from "primevue/image";
import InlineMessage from "primevue/inlinemessage";
import Inplace from "primevue/inplace";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import Knob from "primevue/knob";
import Galleria from "primevue/galleria";
import Listbox from "primevue/listbox";
import MegaMenu from "primevue/megamenu";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Message from "primevue/message";
import MultiSelect from "primevue/multiselect";
import OrderList from "primevue/orderlist";
import OrganizationChart from "primevue/organizationchart";
import OverlayPanel from "primevue/overlaypanel";
import Paginator from "primevue/paginator";
import Panel from "primevue/panel";
import PanelMenu from "primevue/panelmenu";
import Password from "primevue/password";
import PickList from "primevue/picklist";
import ProgressBar from "primevue/progressbar";
import Rating from "primevue/rating";
import RadioButton from "primevue/radiobutton";
import Ripple from "primevue/ripple";
import SelectButton from "primevue/selectbutton";
import ScrollPanel from "primevue/scrollpanel";
import ScrollTop from "primevue/scrolltop";
import Slider from "primevue/slider";
import Sidebar from "primevue/sidebar";
import Skeleton from "primevue/skeleton";
import SplitButton from "primevue/splitbutton";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Steps from "primevue/steps";
import StyleClass from "primevue/styleclass";
import TabMenu from "primevue/tabmenu";
import Tag from "primevue/tag";
import TieredMenu from "primevue/tieredmenu";
import Textarea from "primevue/textarea";
import Timeline from "primevue/timeline";
import Toast from "primevue/toast";
import ToastService, {ToastServiceMethods} from "primevue/toastservice";
import Toolbar from "primevue/toolbar";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import ToggleButton from "primevue/togglebutton";
import Tree from "primevue/tree";
import TreeSelect from "primevue/treeselect";
import TreeTable from "primevue/treetable";
import TriStateCheckbox from "primevue/tristatecheckbox";
import Tooltip from "primevue/tooltip";
import DialogService, {DialogServiceMethods} from "primevue/dialogservice";
import DynamicDialog from "primevue/dynamicdialog";

export interface AppStateOptions {
  theme: string;
  darkTheme: boolean;
}

// @ts-ignore
export default defineNuxtPlugin(nuxt => {
  nuxt.provide("appState", reactive<AppStateOptions>({theme: "lara-light-indigo", darkTheme: false}));

  nuxt.vueApp.use(PrimeVue, {ripple: true, inputStyle: "outlined"});
  nuxt.vueApp.use(ConfirmationService);
  nuxt.vueApp.use(ToastService);
  nuxt.vueApp.use(DialogService);

  nuxt.vueApp.directive("tooltip", Tooltip);
  nuxt.vueApp.directive("ripple", Ripple);
  nuxt.vueApp.directive("badge", BadgeDirective);
  nuxt.vueApp.directive("styleclass", StyleClass);

  nuxt.vueApp.component("Accordion", Accordion);
  nuxt.vueApp.component("AccordionTab", AccordionTab);
  nuxt.vueApp.component("AutoComplete", AutoComplete);
  nuxt.vueApp.component("Avatar", Avatar);
  nuxt.vueApp.component("AvatarGroup", AvatarGroup);
  nuxt.vueApp.component("Badge", Badge);
  nuxt.vueApp.component("Breadcrumb", Breadcrumb);
  nuxt.vueApp.component("Button", Button);
  nuxt.vueApp.component("Calendar", Calendar);
  nuxt.vueApp.component("Card", Card);
  nuxt.vueApp.component("Carousel", Carousel);
  nuxt.vueApp.component("Chart", Chart);
  nuxt.vueApp.component("Checkbox", Checkbox);
  nuxt.vueApp.component("Chip", Chip);
  nuxt.vueApp.component("Chips", Chips);
  nuxt.vueApp.component("ColorPicker", ColorPicker);
  nuxt.vueApp.component("Column", Column);
  nuxt.vueApp.component("ConfirmDialog", ConfirmDialog);
  nuxt.vueApp.component("ConfirmPopup", ConfirmPopup);
  nuxt.vueApp.component("ContextMenu", ContextMenu);
  nuxt.vueApp.component("DataTable", DataTable);
  nuxt.vueApp.component("DataView", DataView);
  nuxt.vueApp.component("DataViewLayoutOptions", DataViewLayoutOptions);
  nuxt.vueApp.component("Dialog", Dialog);
  nuxt.vueApp.component("Divider", Divider);
  nuxt.vueApp.component("Dropdown", Dropdown);
  nuxt.vueApp.component("DynamicDialog", DynamicDialog);
  nuxt.vueApp.component("Fieldset", Fieldset);
  nuxt.vueApp.component("FileUpload", FileUpload);
  nuxt.vueApp.component("Image", Image);
  nuxt.vueApp.component("InlineMessage", InlineMessage);
  nuxt.vueApp.component("Inplace", Inplace);
  nuxt.vueApp.component("InputMask", InputMask);
  nuxt.vueApp.component("InputNumber", InputNumber);
  nuxt.vueApp.component("InputSwitch", InputSwitch);
  nuxt.vueApp.component("InputText", InputText);
  nuxt.vueApp.component("Galleria", Galleria);
  nuxt.vueApp.component("Knob", Knob);
  nuxt.vueApp.component("Listbox", Listbox);
  nuxt.vueApp.component("MegaMenu", MegaMenu);
  nuxt.vueApp.component("Menu", Menu);
  nuxt.vueApp.component("Menubar", Menubar);
  nuxt.vueApp.component("Message", Message);
  nuxt.vueApp.component("MultiSelect", MultiSelect);
  nuxt.vueApp.component("OrderList", OrderList);
  nuxt.vueApp.component("OrganizationChart", OrganizationChart);
  nuxt.vueApp.component("OverlayPanel", OverlayPanel);
  nuxt.vueApp.component("Paginator", Paginator);
  nuxt.vueApp.component("Panel", Panel);
  nuxt.vueApp.component("PanelMenu", PanelMenu);
  nuxt.vueApp.component("Password", Password);
  nuxt.vueApp.component("PickList", PickList);
  nuxt.vueApp.component("ProgressBar", ProgressBar);
  nuxt.vueApp.component("RadioButton", RadioButton);
  nuxt.vueApp.component("Rating", Rating);
  nuxt.vueApp.component("SelectButton", SelectButton);
  nuxt.vueApp.component("ScrollPanel", ScrollPanel);
  nuxt.vueApp.component("ScrollTop", ScrollTop);
  nuxt.vueApp.component("Slider", Slider);
  nuxt.vueApp.component("Sidebar", Sidebar);
  nuxt.vueApp.component("Skeleton", Skeleton);
  nuxt.vueApp.component("SplitButton", SplitButton);
  nuxt.vueApp.component("Splitter", Splitter);
  nuxt.vueApp.component("SplitterPanel", SplitterPanel);
  nuxt.vueApp.component("Steps", Steps);
  nuxt.vueApp.component("TabMenu", TabMenu);
  nuxt.vueApp.component("TabView", TabView);
  nuxt.vueApp.component("TabPanel", TabPanel);
  nuxt.vueApp.component("Tag", Tag);
  nuxt.vueApp.component("Textarea", Textarea);
  nuxt.vueApp.component("TieredMenu", TieredMenu);
  nuxt.vueApp.component("Timeline", Timeline);
  nuxt.vueApp.component("Toast", Toast);
  nuxt.vueApp.component("Toolbar", Toolbar);
  nuxt.vueApp.component("ToggleButton", ToggleButton);
  nuxt.vueApp.component("Tree", Tree);
  nuxt.vueApp.component("TreeSelect", TreeSelect);
  nuxt.vueApp.component("TreeTable", TreeTable);
  nuxt.vueApp.component("TriStateCheckbox", TriStateCheckbox);

  return {
    provide: {
      toast: nuxt.vueApp.config.globalProperties.$toast,
      dialog: nuxt.vueApp.config.globalProperties.$dialog,
      confirm: nuxt.vueApp.config.globalProperties.$confirm,
    }
  };
});

declare module "#app" {
  interface NuxtApp {
    $appState: AppStateOptions;
    $toast: ToastServiceMethods;
    $dialog: DialogServiceMethods;
    $confirm: ConfirmationServiceMethods;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $appState: AppStateOptions;
    $toast: ToastServiceMethods;
    $dialog: DialogServiceMethods;
    $confirm: ConfirmationServiceMethods;
  }
}

export {};
