// global

let projectData = [];
let projectId = '';

// mobile menu

const mobileMenu = document.querySelector('.mobile-nav');
const menuItems = document.querySelectorAll('.mobile-nav ul li');
const menuBtn = document.getElementById('menu-i');
const closeBtn = document.getElementById('menu-i-close');

menuItems.forEach((el) => {
  el.addEventListener('click', () => mobileMenu.classList.toggle('open-menu'));
});
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open-menu');
});
closeBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open-menu');
});

const projectsEl = document.querySelector('#projects');

// popup section

const getProjectById = (id) => {
  for (let i = 0; i < projectData.length; i += 1) {
    if (projectData[i].id === id) {
      return projectData[i];
    }
  }
  return null;
};

const popUpImgGallery = (project) => {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('popUpImgGallery');

  const mainImg = document.createElement('div');
  mainImg.id = 'main';
  const projectImg = document.createElement('img');
  const projectImgSrc = `assets/images/${project.featured_images[0]}.png`;
  projectImg.src = projectImgSrc;
  mainImg.appendChild(projectImg);
  projectDiv.appendChild(mainImg);

  for (let i = 0; i < project.featured_images.length; i += 1) {
    const childImg = document.createElement('img');
    childImg.src = `assets/images/${project.featured_images[i]}.png`;

    childImg.id = `img-${i + 1}`;
    projectDiv.appendChild(childImg);
    childImg.addEventListener('click', () => {
      projectImg.src = childImg.src;
    });
  }
  return projectDiv;
};

const popUpTextContent = (project) => {
  const projectName = document.createElement('h2');
  projectName.textContent = `${project.name}`;
  projectName.classList.add('popup-project-title');
  const projectContent = document.createElement('p');
  const p1 = project.description.slice(0, 195);
  const p2 = project.description.slice(196, -1);
  projectContent.innerHTML = `${p1} <br><br> ${p2}`;
  projectContent.className = 'popup-project-desc';
  return [projectName, projectContent];
};

const idNumber = (str) => {
  const arr = str.toString().split('');
  const idNo = arr[arr.length - 1];
  const rVal = parseInt(idNo, 10);
  return rVal;
};

const btnStack = (project) => {
  const liveBtn = document.createElement('button');
  liveBtn.className = 'pop-util-btn';

  const liveBtnImg = document.createElement('img');
  liveBtnImg.src = 'assets/images/ic_link.svg';

  liveBtn.textContent = 'See Live';
  liveBtn.appendChild(liveBtnImg);

  const sourceBtn = document.createElement('button');
  sourceBtn.className = 'pop-util-btn';
  const sourceBtnImg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
  <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
</svg>`;

  sourceBtn.textContent = 'See Source';
  sourceBtn.innerHTML += sourceBtnImg;
  const btnfregment = document.createElement('div');
  btnfregment.classList.add('pop-btn-freg', 'flex');
  btnfregment.appendChild(liveBtn);
  btnfregment.appendChild(sourceBtn);

  const svgImg = sourceBtn.lastChild;

  sourceBtn.addEventListener('mouseover', () => {
    svgImg.style.fill = 'white';
  });

  sourceBtn.addEventListener('mouseout', () => {
    svgImg.style.fill = '#1a2236';
  });

  liveBtn.addEventListener('click', () => {
    window.open(`${project.live_link}`, '_blank');
  });

  sourceBtn.addEventListener('click', () => {
    window.open(`${project.source_link}`, '_blank');
  });
  return btnfregment;
};

const createProjectTechStack = (project) => {
  const ulEl = document.createElement('ul');
  ulEl.className = 'project-langs';
  for (let i = 0; i < project.technologies.length; i += 1) {
    const liEl = document.createElement('li');
    liEl.className = 'project-lang';
    const spanEl = document.createElement('span');
    spanEl.textContent = `${project.technologies[i]}`;
    liEl.appendChild(spanEl);
    ulEl.appendChild(liEl);
  }
  return ulEl;
};

const createPopUpContent = () => {
  const project = getProjectById(projectId);
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project-content', 'flex');

  const TextContent = popUpTextContent(project);
  const popUpProjectTechUl = createProjectTechStack(project);
  const popUpProjectTechUlDiv = document.createElement('div');
  popUpProjectTechUlDiv.className = 'popup-tech-container';
  popUpProjectTechUlDiv.appendChild(popUpProjectTechUl);
  popUpProjectTechUl.id = 'popup-tech-ul';
  popUpProjectTechUl.classList.add('flex');

  const contentFreg = document.createDocumentFragment();

  contentFreg.appendChild(TextContent[0]);
  contentFreg.appendChild(popUpProjectTechUlDiv);
  contentFreg.appendChild(popUpImgGallery(project));
  contentFreg.appendChild(TextContent[1]);
  contentFreg.appendChild(btnStack(project));

  projectDiv.appendChild(contentFreg);

  return projectDiv;
};

const createPopUpCloseBtn = () => {
  const popUpCloseBtn = `<div>
  <img
    src="assets/images/Union.svg"
    alt="mobile-menu close btn"
  />
  </div>`;
  return popUpCloseBtn;
};

const contentReplacer = (Btn, Id) => {
  const newContent = createPopUpContent(Id);
  const parentNode = document.querySelector('.project-popup');
  const currentNode = document.querySelector('.project-content');
  Btn.id = Id;
  parentNode.replaceChild(newContent, currentNode);
  projectId = Id;
  return Btn;
};

const prevNextBtn = () => {
  const prevBtn = document.createElement('button');
  const nextBtn = document.createElement('button');

  prevBtn.classList.add('flex', 'bottom-slide', 'b-1');
  nextBtn.classList.add('flex', 'bottom-slide', 'b-2');

  prevBtn.id = 'pop-pre-btn';
  nextBtn.id = 'pop-post-btn';

  prevBtn.innerHTML += `
    <img src="assets/images/ic_arrow_left.svg"/>
    <p>Previous project</p>
  `;

  nextBtn.innerHTML += `
  <img src="assets/images/ic_arrow_right.svg"/>
  <p>Next project</p>
  `;

  const slideBtns = document.createElement('div');
  slideBtns.classList.add('slide-btns');

  prevBtn.disabled = projectId === 'project-1';

  const lastElIndex = projectData.length - 1;
  const lastEl = projectData[lastElIndex].id;

  nextBtn.disabled = projectId === lastEl;

  prevBtn.addEventListener('click', () => {
    const currentId = idNumber(projectId);
    let preId = `project-${currentId - 1}`;
    prevBtn.disabled = preId === 'project-0';
    if (preId === 'project-0') {
      preId = 'project-2';
    }
    const disabler = idNumber(preId);
    nextBtn.disabled = preId === `project-${disabler + 1}`;
    contentReplacer(prevBtn, preId);
  });

  nextBtn.addEventListener('click', () => {
    const currentId = idNumber(projectId);
    let postId = `project-${currentId + 1}`;
    const lastEl = projectData[lastElIndex].id;
    const disabler = idNumber(lastEl);
    nextBtn.disabled = postId === `project-${disabler + 1}`;
    prevBtn.disabled = postId === 'project-0';
    if (postId === `project-${disabler + 1}`) {
      const elChanger = idNumber(lastEl);
      postId = `project-${elChanger - 1}`;
    }
    contentReplacer(nextBtn, postId);
  });

  slideBtns.appendChild(prevBtn);
  slideBtns.appendChild(nextBtn);

  return slideBtns;
};

const projectPopUpCloseEventListener = (projectPopUp) => {
  const projectCloseBtn = document.querySelector('.cross-div > img');
  projectCloseBtn.addEventListener('click', () => {
    document.querySelector('body').removeChild(projectPopUp);
  });
};

const projectCreater = (currentProjectId) => {
  projectId = currentProjectId;
  const projectPopUp = document.createElement('div');
  projectPopUp.classList.add('project-popup', 'popins');

  projectPopUp.innerHTML += createPopUpCloseBtn();
  projectPopUp.appendChild(createPopUpContent());
  projectPopUp.appendChild(prevNextBtn());

  const cross = projectPopUp.firstChild;
  cross.classList.add('cross-div');
  const body = document.querySelector('body');
  body.appendChild(projectPopUp);

  projectPopUpCloseEventListener(projectPopUp);
};

const createPopUp = () => {
  const projectBtns = document.querySelectorAll('.project-btn');
  projectBtns.forEach((projectBtn) => {
    projectBtn.addEventListener('click', () => {
      projectCreater(projectBtn.id);
    });
  });
};

// project section

const createProjectBtn = (project) => {
  const projectBtnEl = document.createElement('button');
  const spanEl = document.createElement('span');
  const imgEl = document.createElement('img');

  projectBtnEl.classList.add('project-btn', 'flex');
  projectBtnEl.id = project.id;

  spanEl.textContent = 'See this project';

  imgEl.src = 'assets/images/right-arrow.svg';
  imgEl.height = 15;
  imgEl.width = 20;

  imgEl.alt = 'project btn img';

  projectBtnEl.appendChild(spanEl);
  projectBtnEl.appendChild(imgEl);

  return projectBtnEl;
};

const createProjectImage = (project) => {
  const projectImg = document.createElement('img');
  projectImg.src = `assets/images/${project.featured_images[0]}.png`;

  projectImg.className = 'project-img';
  projectImg.alt = 'project image';
  return projectImg;
};

const createProjectOverlay = (project) => {
  const projectOverlayEl = document.createElement('div');
  projectOverlayEl.classList.add('project-overlay', 'flex');
  const projectNameEl = document.createElement('p');
  projectNameEl.textContent = `${project.name}`;

  const projectOverlayfreg = document.createDocumentFragment();

  projectOverlayfreg.appendChild(projectNameEl);
  projectOverlayfreg.appendChild(createProjectTechStack(project));
  projectOverlayfreg.appendChild(createProjectBtn(project));

  projectOverlayEl.appendChild(projectOverlayfreg);

  return projectOverlayEl;
};

const createProject = (project) => {
  const projectEl = document.createElement('article');
  projectEl.id = project.id;
  projectEl.className = 'project';

  projectEl.appendChild(createProjectImage(project));
  projectEl.appendChild(createProjectOverlay(project));
  return projectEl;
};

// project section end

const loadProjects = () => {
  fetch('projects.json')
    .then((response) => response.json())
    .then((data) => {
      const projectArray = data.projects;
      projectData = data.projects;
      projectArray.forEach((project) => {
        projectsEl.appendChild(createProject(project));
      });
      createPopUp();
    })
    .catch(() => {
      // console.error('Error:', error);
    });
};

loadProjects();

// email validation start

const form = document.querySelector('form');
const userNameInput = document.querySelector('#user-name');
const emailInput = document.querySelector('#email');
const msgInput = document.querySelector('#user-message');
const errorText = document.querySelector('#error-text');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailText = emailInput.value;

  if (emailText === emailText.toLowerCase()) {
    form.submit();
  } else {
    errorText.style.display = 'block';
  }
});

// email validation end

// local storage

const retriveLocalObject = () => {
  const userDataString = localStorage.getItem('userData');
  if (!userDataString) {
    const object = {};
    const jsonString = JSON.stringify(object);
    localStorage.setItem('userData', jsonString);
    return null;
  }
  const userDataObject = JSON.parse(userDataString);
  return userDataObject;
};

const stringifyMethod = (updateObject) => {
  const updateObjectString = JSON.stringify(updateObject);
  localStorage.setItem('userData', updateObjectString);
};

userNameInput.onchange = () => {
  const updateObject = retriveLocalObject();
  updateObject.name = userNameInput.value;
  stringifyMethod(updateObject);
};

emailInput.onchange = () => {
  const updateObject = retriveLocalObject();
  updateObject.email = emailInput.value;
  stringifyMethod(updateObject);
};

msgInput.onchange = () => {
  const updateObject = retriveLocalObject();
  updateObject.msg = msgInput.value;
  stringifyMethod(updateObject);
};

const retriveLocalData = () => {
  const userData = retriveLocalObject();
  if (userData) {
    if (Object.keys(userData) !== 0) {
      userNameInput.value = userData.name ? userData.name : '';
      emailInput.value = userData.email ? userData.email : '';
      msgInput.value = userData.msg ? userData.msg : '';
    }
  }
};

retriveLocalData();
