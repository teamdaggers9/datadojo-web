import {useEffect} from "react";
export const usePageTitle = (title) => {
    useEffect(() => {
        title && (document.title = title);
    }, [title]);
}