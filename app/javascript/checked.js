function check() {
  // 投稿のDOMを取得
  const posts = document.getElementsByClassName("post");

  // 取得したDOMを配列に変換
  postsA = Array.from(posts);

  postsA.forEach(function(post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // 投稿をクリックした場合に実行する処理の定義
    post.addEventListener("click", (e) => {
      // クリックした投稿のidをカスタムデータを利用して取得
      const postId = post.getAttribute("data-id");

      // Ajaxに必要なオブジェクトの生成
      const XHR = new XMLHttpRequest();

      // openでリクエストを初期化（どのようなリクエストなのかを指定）
      XHR.open("GET", `/posts/${postId}`, true);

      // レスポンスのタイプを指定
      XHR.responseType = "json";

      // sendでリクエストの送信
      XHR.send();

      // レスポンスを受け取った時の処理
      XHR.onload = () => {
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータ追加
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除
          post.removeAttribute("data-check");
        }

        if (XHR.status != 200) {
          // レスポンスのHTTPステータスを解析し、該当するエラーメッセージをアラートで表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      };
      // リクエストが送信できなかった時
      XHR.onerror = () => {
        alert("Request failed");
      };

      // イベントをキャンセルして、処理が重複しないようにしている
      e.preventDefault();
    });
  });
}

setInterval(check, 1000);