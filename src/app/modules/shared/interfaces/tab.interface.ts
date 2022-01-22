import {Category} from "@shared/enums/category.enum";

export interface Tab {
  title: string;
  category: Category;
  active: boolean;
}
