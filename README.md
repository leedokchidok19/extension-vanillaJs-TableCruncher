# Table Cruncher (Side Panel)

## 개요

웹페이지 내 테이블과 텍스트에서 숫자 데이터를 추출하여 즉석에서 사칙연산을 수행하는 브라우저 확장 프로그램입니다. 사이드바(Side Panel) 형식을 채택하여 웹 서핑 중에도 계산기 창이 가려지지 않고 지속적으로 작업이 가능합니다.

## 주요 기능

* 데이터 자동 추출: 웹페이지 내 숫자 영역 드래그 또는 복사 시 리스트에 자동 추가
* 사이드바 UI: 웹페이지와 독립적으로 고정되어 실시간 연산 결과 확인 가능
* 사칙연산 지원: 수집된 숫자 리스트에 대한 합계, 차, 곱, 나눗셈 수행
* Iframe 대응: 보안상 접근이 어려운 iframe 내부의 테이블 데이터 추출 지원

## 기술 스택

* HTML5, CSS3
* Vanilla JavaScript (ES6+)
* Chrome Extension API (Manifest V3)

## 설치 방법

1. 저장소의 소스 코드를 다운로드합니다.
2. 크롬 브라우저에서 chrome://extensions/로 이동합니다.
3. 우측 상단의 **개발자 모드**를 활성화합니다.
4. **압축해제된 확장 프로그램을 로드합니다** 버튼을 클릭하여 소스 폴더를 선택합니다.

## 사용법

1. 브라우저 우측 상단의 확장 프로그램 아이콘을 클릭하여 사이드바를 엽니다.
2. 웹페이지에서 계산을 원하는 숫자 영역을 마우스로 드래그합니다.
3. 사이드바 리스트에 숫자가 추가되면 하단의 연산 버튼(+, -, ×, ÷)을 클릭합니다.
4. **C** 버튼을 누르면 목록과 결과가 초기화됩니다.

## 개인정보 보호 (Privacy Policy)

본 프로그램은 사용자가 직접 드래그하거나 선택한 텍스트에서 숫자 패턴만을 추출합니다. 모든 데이터는 브라우저 로컬 저장소(chrome.storage.local)에만 임시 저장되며, 외부 서버로 절대 전송되지 않습니다. 폐쇄망 환경에서도 안전하게 사용 가능합니다.

[English Brief]
Table Cruncher is a Chrome extension for extracting and calculating numbers from web tables via a persistent Side Panel. It supports basic arithmetic operations and works within iframes. All data is processed locally for privacy.