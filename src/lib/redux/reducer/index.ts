import search from "./search";
import player from "./player";
import progress from "./player/progress";
import { combineReducers } from "redux";

export default combineReducers({ search, player, progress });
