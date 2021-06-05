declare module "*.css";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg" {
  const content: string;
  export default content;
}
declare module "*.json" {
  const value: JSON;
  export default value;
}
declare module "*.scss" {
  const style: any;
  export default style;
}
declare module "*.sass" {
  const style: any;
  export default style;
}
