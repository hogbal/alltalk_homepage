import React, { memo, useEffect, useState } from "react";
import "./SignUpInput.scss";

import Input from "components/Input/Input";
import Space from "components/Space/Space";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpInputStep1 = memo((props) => {
  const {
    id,
    password,
    passwordDoubleCheck,
    phoneNumber,
    name,
    email,
    idCheckError,
    passwordCheckError,
    passwordDoubleCheckError,
    phoneNumberError,
    nameError,
    emailCheckError,
    errorCheck,
  } = props.inputs;
  const { onChangeInput, onClickbtnCheck, nextButton } = props;

  return (
    <div className="signUpInputStep1">
      <div className="signUpInputStep1-title">기본정보 입력</div>

      <div className="signUpInputStep1-content">
        <Space size={40} />
        <div className="signUpInputStep1-input">
          아이디*
          <Space size={16} />
          <div
            className={`signUpInputStep1-input-double-check ${
              !idCheckError &&
              errorCheck &&
              "signUpInputStep1-input-double-check-error"
            }`}
          >
            <input
              type={"text"}
              placeholder="5~16자의 영문, 숫자, ‘-’,’_’ 사용"
              onChange={onChangeInput}
              name={"id"}
              value={id}
            />
            <button onClick={onClickbtnCheck}>중복확인</button>
          </div>
          {!idCheckError && errorCheck && (
            <div className="signUpInputStep1-input-error">
              5~16자의 영문 대 소문자, 숫자 특수문자 ‘-’,’_’ 를 사용해주세요.
            </div>
          )}
        </div>
        <div className="signUpInputStep1-input">
          비밀번호*
          <Space size={16} />
          <Input
            type="password"
            placeholder="8~15자의 영문, 숫자,특수문자 사용"
            onChange={onChangeInput}
            name={"password"}
            value={password}
            error={!passwordCheckError && errorCheck}
          />
          {!passwordCheckError && errorCheck && (
            <div className="signUpInputStep1-input-error">
              {password.length === 0
                ? "비밀번호를 입력해주세요."
                : "8~15자의 영문 대 소문자, 숫자, 특수문자를 사용해주세요."}
            </div>
          )}
          <Space size={8} />
          <Input
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            onChange={onChangeInput}
            name={"passwordDoubleCheck"}
            value={passwordDoubleCheck}
            error={!passwordDoubleCheckError && errorCheck}
          />
          {!passwordDoubleCheckError && errorCheck && (
            <div className="signUpInputStep1-input-error">
              {passwordDoubleCheck.length === 0
                ? "비밀번호를 한 번 더 입력해주세요."
                : "비밀번호가 일치하지 않습니다."}
            </div>
          )}
        </div>
        <div className="signUpInputStep1-input">
          이름*
          <Space size={16} />
          <Input
            type="text"
            placeholder="2~8자의 이름을 입력해주세요."
            onChange={onChangeInput}
            name={"name"}
            value={name}
            error={!nameError && errorCheck}
          />
          {!nameError && errorCheck && (
            <div className="signUpInputStep1-input-error">
              -2~8글자의 이름을 입력해주세요.
            </div>
          )}
        </div>
        <div className="signUpInputStep1-input">
          휴대폰번호*
          <Space size={16} />
          <Input
            type="number"
            placeholder="‘-’ 없이 입력 (ex:01012345678)"
            onChange={onChangeInput}
            name={"phoneNumber"}
            value={phoneNumber}
            error={!phoneNumberError && errorCheck}
          />
          {!phoneNumberError && errorCheck && (
            <div className="signUpInputStep1-input-error">
              {phoneNumber.length === 0
                ? "휴대폰번호를 입력해주세요."
                : "휴대폰번호를 정확하게 입력해주세요."}
            </div>
          )}
        </div>
        <div className="signUpInputStep1-input">
          이메일*
          <Space size={16} />
          <Input
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={onChangeInput}
            name={"email"}
            value={email}
            error={!emailCheckError && errorCheck}
          />
          {!emailCheckError && errorCheck && (
            <div className="signUpInputStep1-input-error">
              {email.length === 0
                ? "이메일을 입력해주세요."
                : " 이메일 형식이 올바르지 않습니다."}
            </div>
          )}
        </div>

        <button className="signUpInputStep1-btn" onClick={nextButton}>
          다음
        </button>
      </div>
    </div>
  );
});

const SignUpInputStep2 = memo((props) => {
  const {
    nickname,
    nicknameError,
    birth,
    birthError,
    tags,
    tagsError,
    signUpCehck,
  } = props.inputs;

  const {
    onChangeInput,
    onClickJoin,
    onChangeTags,
    RemoveTags,
    onChangeGender,
    signUp,
  } = props;

  const [selectedGender, setSelectedGender] = useState("male");

  const onSelectGender = (e) => {
    setSelectedGender(e.currentTarget.innerText === "남" ? "male" : "female");
    onChangeGender(() => {
      return selectedGender;
    });
  };

  const HashtagInput = ({ hashtags, setHashtags, placeholder }) => {
    const [newTag, setNewTag] = useState("");

    const handleSubmit = (e) => {
      if (newTag !== " " && newTag.length > 0) {
        // 스페이스바 32 엔터 13
        if (e.which === 32 || e.which === 13) {
          e.preventDefault();
          onChangeTags(newTag);
          setNewTag("");
        }
      }
    };

    return (
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyPress={handleSubmit}
        placeholder={placeholder}
        className="signUpInputStep2-hashtag-input"
        style={{ tagsError: tagsError || "#ee0909" }}
      />
    );
  };

  const HashtagList = memo((props) => {
    const Hashtag = ({ tag }) => {
      return (
        <button
          className="signUpInputStep2-hashtag"
          onClick={RemoveTags}
          value={tag}
        >
          {tag}
          <span>X</span>
        </button>
      );
    };
    return (
      <>
        {props.hashtags.map((tag) => (
          <Hashtag key={tag} tag={tag} />
        ))}
      </>
    );
  });
  return (
    <div className="signUpInputStep2">
      <div className="signUpInputStep2-title">상세정보 입력</div>

      <div className="signUpInputStep2-content">
        <Space size={40} />
        <div className="signUpInputStep2-input">
          닉네임*
          <Space size={16} />
          <Input
            type="text"
            placeholder="2~8글자의 한글,영문,숫자 사용"
            onChange={onChangeInput}
            name={"nickname"}
            value={nickname}
            error={!nicknameError && signUpCehck}
          />
          {!nicknameError && signUpCehck && (
            <div className="signUpInputStep2-input-error">
              -이미 사용중인 닉네임입니다 (이름 중복 가능하면 X) -2~8글자의
              한글,영문,숫자를 사용해주세요. -닉네임을 입력해주세요.
            </div>
          )}
        </div>
        <div className="signUpInputStep2-input">
          성별*
          <Space size={16} />
          <div className="signUpInputStep2-input-genderbtns">
            <button
              className={`male ${
                selectedGender === "male" && "selectedGender"
              }`}
              onClick={onSelectGender}
            >
              남
            </button>
            <button
              className={`female ${
                selectedGender === "female" && "selectedGender"
              }`}
              onClick={onSelectGender}
            >
              여
            </button>
          </div>
        </div>
        <div className="signUpInputStep2-input">
          생년월일*
          <Space size={16} />
          <Input
            type="number"
            placeholder="8자리 입력 (ex:20001220)"
            onChange={onChangeInput}
            name={"birth"}
            value={birth}
            error={!birthError && signUpCehck}
          />
          {!birthError && signUpCehck && (
            <div className="signUpInputStep2-input-error">
              -생년월일을 8자리로 입력해주세요. -생년월일을 정확히 입력해주세요.
            </div>
          )}
        </div>
        <div className="signUpInputStep2-input">
          관심사 태그 (3개 이상)*
          <Space size={16} />
          <HashtagInput
            hashtags={tags}
            setHashtags={onChangeTags}
            placeholder={"관심사 태그를 입력해주세요. (ex:스포츠)"}
          />
          {tags.length !== 0 && (
            <div className="signUpInputStep2-hashtag-list">
              <HashtagList hashtags={tags} setHashtags={onChangeTags} />
            </div>
          )}
          {tagsError && signUpCehck && (
            <div className="signUpInputStep2-input-error">
              관심사 태그를 3개 이상 입력해주세요.
            </div>
          )}
        </div>

        <div className="signUpInputStep2-btn-container">
          <button
            className="signUpInputStep2-prevbtn"
            onClick={props.prevButton}
          >
            이전
          </button>
          <button className="signUpInputStep2-nextbtn" onClick={onClickJoin}>
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
});

const SignUpInput = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [nextBtnActive, setNextBtnActive] = useState(false);

  const [inputs, setInputs] = useState({
    id: "",
    idCheckError: false,
    password: "",
    passwordCheckError: false,
    passwordDoubleCheck: "",
    passwordDoubleCheckError: false,
    name: "",
    nameError: false,
    phoneNumber: "",
    phoneNumberError: false,
    email: "",
    emailCheckError: false,
    nickname: "",
    nicknameError: false,
    birth: "",
    birthError: false,
    tags: [],
    tagsError: false,
    gender: true,
    admin: false,
    errorCheck: false,
    signUpCehck: false,
  });

  useEffect(() => {
    const {
      idCheckError,
      passwordCheckError,
      passwordDoubleCheck,
      nameError,
      phoneNumberError,
      emailCheckError,
    } = inputs;

    if (
      idCheckError &&
      passwordCheckError &&
      passwordDoubleCheck &&
      nameError &&
      phoneNumberError &&
      emailCheckError &&
      nextBtnActive
    )
      setStep(1);
  }, [
    inputs.idCheckError,
    inputs.passwordCheckError,
    inputs.passwordDoubleCheck,
    inputs.nameError,
    inputs.phoneNumberError,
    inputs.emailCheckError,
    nextBtnActive,
  ]);

  const signUp = async () => {
    try {
      const {
        id,
        password,
        name,
        phoneNumber,
        email,
        nickname,
        gender,
        birth,
        tags,
        admin,
      } = inputs;

      const frm = new FormData();
      frm.append("id", id);
      frm.append("pw", password);
      frm.append("name", name);
      frm.append("phone", phoneNumber);
      frm.append("email", email);
      frm.append("nickname", nickname);
      frm.append("sex", gender);
      frm.append("birthday", birth);
      frm.append("tag", tags);
      frm.append("admin", admin);

      await axios({
        method: "POST",
        url: "http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/signup",
        data: frm,
      })
        .then((res) => {
          if (res.data.result) {
            navigate("/");
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const nextButton = () => {
    setInputs({
      ...inputs,
      passwordCheckError: password_check(inputs.password),
      passwordDoubleCheckError: password_double_check(
        inputs.passwordDoubleCheck,
        inputs.password
      ),
      nameError:
        inputs.name.length >= 2 && inputs.name.length <= 8 ? true : false,
      phoneNumberError: phoneNumber_check(inputs.phoneNumber),
      emailCheckError: email_check(inputs.email),
      errorCheck: true,
    });
    setNextBtnActive(true);
  };
  const prevButton = () => {
    setStep(0);
    setInputs({
      ...inputs,
      errorCheck: false,
      signUpCehck: false,
    });
    setNextBtnActive(false);
  };

  const onClickJoin = () => {
    const {
      nickname,
      birth,
      tags,
      nicknameError,
      birthError,
      tagsError,
      gender,
    } = inputs;
    setInputs({
      ...inputs,
      nicknameError: nicknameError_check(nickname),
      birthError: birthError_check(birth),
      tagsError: tagsError_check(tags),
    });

    if (!nicknameError && !birthError && !tagsError) {
      signUp();
    } else {
    }
  };

  const onChangeInput = (e) => {
    switch (e.currentTarget.name) {
      case "id":
        setInputs({ ...inputs, id: e.currentTarget.value });
        break;
      case "password":
        setInputs({ ...inputs, password: e.currentTarget.value });
        break;
      case "passwordDoubleCheck":
        setInputs({ ...inputs, passwordDoubleCheck: e.currentTarget.value });
        break;
      case "name":
        setInputs({ ...inputs, name: e.currentTarget.value });
        break;
      case "phoneNumber":
        setInputs({ ...inputs, phoneNumber: e.currentTarget.value });
        break;
      case "email":
        setInputs({ ...inputs, email: e.currentTarget.value });
        break;
      case "nickname":
        setInputs({ ...inputs, nickname: e.currentTarget.value });
        break;
      case "birth":
        setInputs({ ...inputs, birth: e.currentTarget.value });
        break;
      default:
        break;
    }
  };

  const onChangeTags = (newTag) => {
    setInputs({ ...inputs, tags: [...inputs.tags, newTag] });
  };

  const RemoveTags = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      tags: inputs.tags.filter((tag) => tag !== e.currentTarget.value),
    });
  };

  const onClickbtnCheck = async () => {
    try {
      const frm = new FormData();
      frm.append("id", inputs.id);
      await axios({
        method: "POST",
        url: "http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/signup/id",
        data: frm,
      })
        .then((res) => {
          console.log(res.data);
          // if (res.data.result) {
          setInputs({ ...inputs, idCheckError: res.data.result });
          // }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeGender = (gender) => {
    setInputs({ ...inputs, gender: gender });
  };
  const email_check = (email) => {
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
  };

  const id_check = (id) => {
    const regExp = /^[A-za-z0-9_-]{5,16}$/;
    return regExp.test(id);
  };

  const password_check = (password) => {
    const regExp =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,15}$/;
    return regExp.test(password);
  };

  const password_double_check = (passwordDoubleCheck, password) => {
    if (passwordDoubleCheck === "" || passwordDoubleCheck !== password)
      return false;
    return true;
  };

  const phoneNumber_check = (phoneNumber) => {
    const regExp = /^010?([0-9]{8})/;

    return regExp.test(phoneNumber);
  };
  const nicknameError_check = (nickname) => {
    const regExp = /^[a-zA-Z][0-9가-힣]{2,8}/;
    return regExp.test(nickname);
  };

  const birthError_check = (birthError) => {
    return birthError < 19000000;
  };

  const tagsError_check = (tags) => {
    return tags.length < 3;
  };
  return (
    <div className="signUpInput">
      <div className="signUpInput-container">
        <div
          className="signUpInput-list"
          style={{ transform: `translate(${-step * 480}px)` }}
        >
          <SignUpInputStep1
            inputs={inputs}
            nextButton={nextButton}
            onChangeInput={onChangeInput}
            onClickbtnCheck={onClickbtnCheck}
          />
          <SignUpInputStep2
            inputs={inputs}
            prevButton={prevButton}
            onChangeInput={onChangeInput}
            onClickJoin={onClickJoin}
            onChangeTags={onChangeTags}
            RemoveTags={RemoveTags}
            onChangeGender={onChangeGender}
            signUp={signUp}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpInput;
