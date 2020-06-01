import { Show } from "./show.type";
import { Season } from "./season.type";

export interface SaveShowPageData {
    shows: Show[];
    selectedShow: Show;
    seasons: Season[];
    pageSize: number;
    currentPage: number;
    lastPage: boolean;
    queryString: string;
}