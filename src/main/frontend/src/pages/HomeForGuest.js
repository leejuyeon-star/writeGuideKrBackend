import { useState, useEffect, delay, useContext } from "react";

import MainPannel from "../components/homeForGuestFolder/MainPannelForGuest";
import MasterHeader from "../components/MasterHeader";
import RightPannel from "../components/homeForGuestFolder/RightPannelForGuest";
import { CSSTransition} from 'react-transition-group';
import { CallAfterSentenceForTutorial, CallBetweenPhraseForTutorial } from "../api/claude"
import { IsRightPannelVisibleContext, AnswerStateContext, AnswerDetailsContext, MemberAccountContext } from '../ContextProvider';
import '../styles/Home.css'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
// import { useBlocker, useNavigate} from "react-router-dom";       // 라우터를 통한 이동시 차단 or 알림창 띄우기. 참고: https://choisuhyeok.tistory.com/140 
import { GetMemberAccount } from "../api/auth";         
import { useNavigate } from "react-router-dom"; 


function HomeForGuest() {
    const navigate = useNavigate(); // useNavigate를 컴포넌트 내부에서 호출
    const { state: {answerState}, actions:{setAnswerState} } = useContext(AnswerStateContext);
    const { state: {answerDetails}, actions:{setAnswerDetails} } = useContext(AnswerDetailsContext);
    const { state: {memberAccount}, actions:{setMemberAccount} } = useContext(MemberAccountContext);

    const [answers, setAnswers] = useState(["","",""]);
    const [changedContentInfo, setChangedContentInfo] = useState(["", false, "", "", [0,0]]);
    const [cursorIdx, setCursorIdx] = useState(0);
    const [draggedIdx, setDraggedIdx] = useState([0,0]);
    const [content, setContent] = useState("");
    const [requestMsg, setRequestMsg] = useState("");
    const [responseErrorMsg, setResponseErrorMsg] = useState("");


    const [isMember, setIsMember] = useState(false);


    //웹갱신시 or api 요청 직후 
    //회원/게스트 여부 확인, token 개수 확인
    useEffect(() => {
        async function a() {
            const _memberAccount = await GetMemberAccount();     //토큰 총 수 가져오기
            if (_memberAccount.userName === "NON_MEMBER") {
                setMemberAccount(_memberAccount);
                return;
            }
            //회원인 경우
            setMemberAccount(_memberAccount);
            setIsMember(true);
        }
        a();
    }, [answerState]);


    const handleRequestedHelp = async ([_requestMsg, _content, _idx]) => {
        //테스트..
        // const txt = `유전자 가위 기술의 발달로 이제 우리는 1.12의 유전자를 편집하는 힘을 얻게 되었다? 이로 인해 유전적 질병의 치료뿐만 아니라 자질 강화는 물론이고 자녀의 유전자마저 결정할 수 있다? 바야흐로 인간은 자연 진화의 주인 자리에 올라 진정 만물의 영장이 되었다. 하지만 유전 정보 및 유전자 편집의 힘은 윤리적, 사회적으로 적지 않은 파장을 일으키고 있다. 생물 안정성이라는 기술상의 위험 요소는 물론이거나 이중 사용의 딜레마로 인한 바이오 테러 등의 생물 보안도 큰 사회적 이슈이다. 이러한 위험보다 더 심각한 것은 윤리물음이다. 동식물 대상의 유전자 편집은 동물권 물음을 야기하고, 인간 대상 유전자 편집은 치료를 넘어 자질 강화를 낳는 유전자 성형의 경우 정의와 연관하여 접근 기회의 공평성, 결과의 평등, 절차적 공정성 등의 윤리 원칙을 요구한다. 특히 맞춤아기의 경우처럼 다음 세대에 유전되는 생식세포 유전자 편집은 부모에 의한 자녀의 유전자 선택으로 부모와 자녀의 관계를 근본적으로 바꾸어 놓을 것이다. 윤리적 유전자 편집을 위한 민주적 숙의 과정이 그 어느 때보다 절실하게`;
        // const idx = [28,30];            //유전자
        // const currentTxt = `이로 인해 유전적 질병의 치료뿐만 아니라 자질 강화는 물론이고 자녀의 유전자마저 결정할 수 있다. 바야흐로 인간은 자연 진화의 주인 자리에 올라`;

        // if (_requestMsg !== null) {
        //     return null;
        // }
        // const currentTxt = _content;    //afterSentence의 경우 사용
        
        let isSucceed = false;
        let msg = "";
        if (_requestMsg === "") {return;}
        setResponseErrorMsg("");
        setAnswerState("LOADING");
        if (_requestMsg === "draggedText") {
            setContent(_content);
            setDraggedIdx(_idx);
            setRequestMsg(_requestMsg);
            const response = await CallBetweenPhraseForTutorial();
            isSucceed = response.isSucceed;
            msg = response.msg;
        } else if (_requestMsg === "afterSentence") {
            setContent(_content);
            setCursorIdx(_idx);
            setRequestMsg(_requestMsg);
            const response = await CallAfterSentenceForTutorial();
            isSucceed = response.isSucceed;
            msg = response.msg;
        } 
    
        
        if (isSucceed) {
            const [answer1, answer2, answer3] = msg;
            setAnswers([answer1, answer2, answer3]);
            setAnswerState("RECEIVED");
        } else {
            setResponseErrorMsg(msg);
            setAnswerState("ERROR");
        }
    }

    const handleChangeContent = async (isApply, txt) => {
        if (requestMsg === "" || content === "") {;return;}
        if (requestMsg === "draggedText") {
            setChangedContentInfo([requestMsg, isApply, txt, content, draggedIdx]);
            
        } else if (requestMsg === "afterSentence"){
            setChangedContentInfo([requestMsg, isApply, txt, content, cursorIdx]);
        }
    }




    return (
        <div>
            <div className="h-pannel-container">
                <div>
                    <br/><br/><br/>
                </div>
                <MainPannel onRequestedHelp={handleRequestedHelp} changedContentInfo={changedContentInfo}/>
                <RightPannel onRequestedHelp={handleRequestedHelp} response={answers} onChangeContent={handleChangeContent} responseErrorMsg={responseErrorMsg}/>
            </div>
        </div>
    );
}

export default HomeForGuest;







