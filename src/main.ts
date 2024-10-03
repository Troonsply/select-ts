import './style.css';
import arrowIcon from '/src/downarrow.svg';

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    job?: string;
};

type Response = {
    data: User[];
    meta: {
        from: number;
        to: number;
        total: number;
    };
}

let currentPage = 1;
const limit = 50;
const totalUsers = 5000;
let isFetching = false;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="select-wrapper">
    <label class="select-wrapper__label">Users</label>
    <button id="selectButton" class="select-button">
      <span>LastName FirstName, jobTitle</span>
      <img src="${arrowIcon}" alt="Icon" class="arrow" />
    </button>
    <ul id="dropdown" class="select-dropdown hidden">
    </ul>
  </div>
`;

const selectButton = document.getElementById("selectButton") as HTMLElement;
const dropdown = document.getElementById("dropdown") as HTMLElement;
const selectButtonText = selectButton.querySelector("span") as HTMLElement;

let selectedItem: HTMLElement | null = null;

const toggleDropdown = async () => {
    dropdown.classList.toggle("hidden");
    if (!selectedItem && dropdown.childElementCount === 0) { // Загрузить первый набор данных при первом открытии
        await fetchAndAppendUsers();
    }
};

const selectItem = (item: HTMLElement) => {
    if (selectedItem) {
        selectedItem.classList.remove("selected");
    }
    item.classList.add("selected");
    selectedItem = item;

    const span = item.querySelector("span");
    if (!span) return;

    selectButtonText.textContent = span.textContent;
    dropdown.classList.add("hidden");
};

const fetchUsers = async (page: number, limit: number): Promise<User[]> => {
    const response = await fetch(`https://frontend-test-middle.vercel.app/api/users?page=${page}&limit=${limit}`);
    const result: Response = await response.json();
    return result.data;
};

const appendUsersToDropdown = (users: User[]) => {
    users.forEach(user => {
        const listItem = document.createElement("li");
        listItem.className = "dropdown-item";
        listItem.innerHTML = `
      <div class="circle">${user.last_name.charAt(0)}</div>
      <span>${user.last_name} ${user.first_name}, ${user.job || 'No job title'}</span>
    `;
        listItem.addEventListener("click", () => selectItem(listItem));
        dropdown.appendChild(listItem);
    });

    if (users.length > 0) {
        const lastItem = dropdown.lastElementChild;
        if (lastItem) {
            observer.observe(lastItem);
        }
    }
};

const fetchAndAppendUsers = async () => {
    if (isFetching) return;
    isFetching = true;

    try {
        const newUsers = await fetchUsers(currentPage, limit);
        appendUsersToDropdown(newUsers);
        currentPage++;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    } finally {
        isFetching = false;
    }
};

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && currentPage * limit < totalUsers) {
        observer.unobserve(entries[0].target); // Отключаем наблюдение за текущим элементом
        fetchAndAppendUsers();
    }
}, {
    root: dropdown,
    threshold: 1.0
});

selectButton.addEventListener("click", toggleDropdown);