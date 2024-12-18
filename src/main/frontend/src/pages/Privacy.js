import { useState, useEffect, delay, useContext } from "react";
import React from "react";
import '../styles/Privacy.css'

function Privacy() {
    return (
        <div className="privacy-container">
            <div className="privacy-displayContant">
                <h1>개인정보 취급방침</h1>
                <p>본 방침은 2024년 12월 5일부터 적용됩니다.</p>
                <h3>1. 개인정보의 수집 및 이용 목적</h3>
                <p>기관은 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                <p>- 홈페이지 회원 가입 및 관리</p>
                <p>- 회원 서비스 제공</p>
                <p>수집 항목: 이름, 닉네임, 아이디</p>
                <h3>2. 개인정보의 파기절차 및 방법</h3>
                <p>기관은 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
                <p>파기절차 및 방법은 다음과 같습니다.</p>
                <p>- 파기절차</p>
                <p>회원 탈퇴 즉시 모든 개인정보를 완전히 삭제합니다.</p>
                <p>탈퇴 전 작성한 게시글이나 생성한 서비스는 자동으로 삭제하지 않습니다.</p>
                <p>따라서 탈퇴 전에 직접 삭제 후 탈퇴하시기 바랍니다.</p>
                <p>- 파기방법</p>
                <p>전자적 파일 형태로 기록, 저장된 개인정보는 기록을 재생할 수 없도록 파기합니다.</p>
                <h3>3. 개인정보 제공</h3>
                <p>기관은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>
                <h3>4. 쿠키 이용여부 및 쿠키 허용 방법 설명</h3>
                <p>해당 웹사이트는 다른 웹사이트와 마찬가지로 '쿠키'를 사용합니다. 이 쿠키는 방문자가 방문한 웹사이트 페이지를 포함한 정보를 저장하는 데 사용됩니다.</p>
                <p>이 정보는 방문자의 브라우저 유형 및/또는 기타 정보에 따라 웹 페이지 콘텐츠를 사용자 지정하여 사용자 경험을 최적화하는 데 사용됩니다.</p>
                <h3>5. 개인정보 관리 책임자 및 담당자</h3>
                <p>관리 책임자: 이주연</p>
                <p>이메일: kkobucks@naver.com</p>
                <h3>6. 개인정보 취급방침 변경에 관한 사항</h3>
                <p>이 개인정보 취급방침은 2024년 12월 5일부터 적용됩니다.</p>


            </div>
        </div>

    );
}


export default Privacy;
