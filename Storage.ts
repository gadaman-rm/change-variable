class Storage {
  appVersion = 1;

  device: "PC" | "Mobile" = "Mobile";
  editMode: "deviceEdit" | "localEdit" = "deviceEdit";

  localEditAddr = "";
  localEditFile = "";

  constructor() {}
}

const storage = new Storage();
export default storage;
