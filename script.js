// ======= Toggle Search Bar =======
function toggleSearch() {
    const input = document.getElementById("searchInput");
    input.style.display = input.style.display === "none" ? "inline-block" : "none";
}

// ======= Search Functionality for Navbar =======
function search() {
    const query = document.getElementById("searchInput").value;
    document.getElementById("results").innerHTML = "نتيجة البحث عن: " + query;
}

// ======= Search Posts =======
function searchPosts() {
    const search = document.getElementById("searchInput").value.toLowerCase();
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const text = post.innerText.toLowerCase();
        post.style.display = text.includes(search) ? "block" : "none";
    });
}

// ======= Search Users =======
function filterUsers() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let listItems = document.querySelectorAll('#userList li');
    listItems.forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(input) ? 'block' : 'none';
    });
}

// ======= Toggle Sidebar =======
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const body = document.body;
    const menuToggle = document.getElementById("menuToggle");
    const icon = menuToggle.querySelector("i");

    sidebar.classList.toggle("active");
    body.classList.toggle("sidebar-open");

    if (sidebar.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    }
}

// ======= Submit Profile Changes =======
const profileForm = document.getElementById("editProfileForm");
if (profileForm) {
    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const bio = document.getElementById("bio").value;
        const profilePic = document.getElementById("profilePic").files[0];

        document.getElementById("displayUsername").textContent = username;
        document.getElementById("displayBio").textContent = bio;

        if (profilePic) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("previewImg").src = e.target.result;
            };
            reader.readAsDataURL(profilePic);
        } else {
            document.getElementById("previewImg").src = "";
        }

        document.getElementById("updatedProfile").style.display = "block";
    });
}

// ======= Post Form Submit =======
const postForm = document.getElementById("postForm");
if (postForm) {
    postForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const content = document.getElementById("postContent").value;
        const mediaInput = document.getElementById("mediaInput");
        const file = mediaInput.files[0];

        const post = {
            content,
            media: null,
            type: null
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                post.media = event.target.result;
                post.type = file.type;
                savePost(post);
            };
            reader.readAsDataURL(file);
        } else {
            savePost(post);
        }

        document.getElementById("postForm").reset();
    });
}

// ======= Save Post to Local Storage =======
function savePost(post) {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

// ======= Render Posts =======
function renderPosts() {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const postList = document.getElementById("postList");
    if (!postList) return;
    postList.innerHTML = "";

    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `<p>${post.content}</p>`;

        if (post.media) {
            if (post.type.startsWith("video")) {
                postDiv.innerHTML += `<video width="300" controls><source src="${post.media}" type="${post.type}"></video>`;
            } else {
                postDiv.innerHTML += `<img src="${post.media}" width="300">`;
            }
        }

        postList.appendChild(postDiv);
    });
}

// ======= Load Posts on Page Load =======
document.addEventListener("DOMContentLoaded", function () {
    renderPosts();
    renderCategories(); // كمان نعرض الكاتيجوري عند تحميل الصفحة
});

// ======= Handle Category Form Submit =======
const categoryForm = document.getElementById("categoryForm");
if (categoryForm) {
    categoryForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("categoryName").value;
        const description = document.getElementById("categoryDescription").value;
        const imageInput = document.getElementById("categoryImage");
        const file = imageInput.files[0];

        const category = {
            name,
            description,
            image: null
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                category.image = event.target.result;
                saveCategory(category);
            };
            reader.readAsDataURL(file);
        } else {
            saveCategory(category);
        }

        document.getElementById("categoryForm").reset();
    });
}

// ======= Save Category =======
function saveCategory(category) {
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    categories.push(category);
    localStorage.setItem("categories", JSON.stringify(categories));
    alert("تمت إضافة الكاتيجوري بنجاح");
    renderCategories();
}

// ======= Render Categories =======
function renderCategories() {
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    const list = document.getElementById("categoryList");
    if (!list) return;
    list.innerHTML = "";

    categories.forEach(cat => {
        const div = document.createElement("div");
        div.className = "category-card";
        div.innerHTML = `<h4>${cat.name}</h4>
            <p>${cat.description}</p>`;

        if (cat.image) {
            div.innerHTML += `<img src="${cat.image}" width="100">`;
        }

        list.appendChild(div);
    });
}
