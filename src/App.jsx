import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootPage } from "./pages/Root.jsx";
import { RestaurantDetailPage } from "./pages/RestaurantDetail.jsx";
import { RestaurantListPage } from "./pages/RestaurantList.jsx";

function Header() {
    return (
        <section className="hero is-warning">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        日大文理
                        <br className="is-hidden-tablet" />
                        ラーメンレビュー
                    </h1>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer ">
            <div className="content">
                <p className="has-text-centered">
                    これは日本大学文理学部情報科学科の開講科目「Web
                    プログラミング」の教材として作成されたサンプルアプリケーションです。
                </p>
            </div>
        </footer>
    );
}

export function App() {
    return (
        <BrowserRouter>
            <Header />
            <section className="section has-background-warning-light">
                <div className="container">
                    <div className="block has-text-right">
                        <button className="button is-warning is-inverted is-outlined">
                            ログイン
                        </button>
                    </div>
                    <Routes>
                        <Route path="/" element={<RootPage />} />
                        <Route path="/restaurants" element={<RestaurantListPage />} />
                        <Route
                            path="/restaurants/:restaurantId"
                            element={<RestaurantDetailPage />}
                        />
                    </Routes>
                </div>
            </section>
            <Footer />
        </BrowserRouter>
    );
}