export interface AllPostsDataDTO {
  title: string;
  id: string;
  date: any;
}

export interface PostDataDTO {
  title: string;
  id: number;
  date: string;
  contentHtml: string;
}

export type MenuData = {
  id: number;
  name: string;
  children?: MenuData[];
};
