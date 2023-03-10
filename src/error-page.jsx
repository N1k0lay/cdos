import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Опа... 404...</h1>
            <p>Страница не найдена</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}