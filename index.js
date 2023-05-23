// global

let projectData = [];

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

//popup section

function getProjectById(id) {
  for (let i = 0; i < projectData.length; i++) {
    if (projectData[i].id === id) {
      return projectData[i];
    }
  }
  return null;
}

const createPopUpContent = (projectBtn) => {
  const project = getProjectById(projectBtn.id);

  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project-content', 'flex');

  const projectImg = document.createElement('img');
  const projectImgSrc = `assets/images/${project.featured_images[0]}.svg`;
  projectImg.src = projectImgSrc;

  const projectName = document.createElement('h2');
  projectName.textContent = `${project.name}`;
  projectName.classList.add('popup-project-title');

  const projectContent = document.createElement('p');
  const p1 = project.description.slice(0, 195);
  const p2 = project.description.slice(196, -1);
  projectContent.innerHTML = `${p1} <br><br> ${p2}`;
  projectContent.className = 'popup-project-desc';

  projectDiv.appendChild(projectName);
  const popUpProjectTechUl = createProjectTechStack(project);
  popUpProjectTechUl.id = 'popup-tech-ul';
  projectDiv.appendChild(popUpProjectTechUl);
  projectDiv.appendChild(projectImg);
  projectDiv.appendChild(projectContent);

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

const createPopUp = () => {
  const projectBtns = document.querySelectorAll('.project-btn');
  projectBtns.forEach((projectBtn) => {
    projectBtn.addEventListener('click', () => {
      const projectPopUp = document.createElement('div');
      projectPopUp.classList.add('project-popup', 'popins');

      projectPopUp.innerHTML += createPopUpCloseBtn();
      projectPopUp.appendChild(createPopUpContent(projectBtn));

      const cross = projectPopUp.firstChild;
      cross.classList.add('cross-div');

      const body = document.querySelector('body');
      body.appendChild(projectPopUp);
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
  projectImg.src = `assets/images/${project.featured_images[0]}.svg`;
  projectImg.className = 'project-img';
  projectImg.alt = 'project image';
  return projectImg;
};

const createProjectTechStack = (project) => {
  const ulEl = document.createElement('ul');
  ulEl.className = 'project-langs';
  for (let i = 0; i < project.technologies.length; i += 1) {
    const liEl = document.createElement('li');
    liEl.className = 'project-lang';
    liEl.textContent = `${project.technologies[i]}`;
    ulEl.appendChild(liEl);
  }
  return ulEl;
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
