import search from "./search";
import context from "./context";
import player from "./player";
import progress from "./player/progress";
import volume from "./player/volume";
import { combineReducers } from "redux";

export default combineReducers({ search, context, player, progress, volume });
