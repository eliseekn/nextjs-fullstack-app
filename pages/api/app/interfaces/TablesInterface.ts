import {Post} from "./PostInterface";
import {User} from "./UserInterface";
import {Token} from "./TokenInterface";
import {Comment} from "./CommentInterface";

export type Tables = {
    posts?: Post[],
    users?: User[],
    tokens?: Token[],
    comments?: Comment[]
}
