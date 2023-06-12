document.addEventListener("DOMContentLoaded", function () {
    const btnNextRev = document.querySelector('.pagination');
    const jarakMargin = document.querySelector('.jarak');
    let sudahDiaktifkan = false; // Variabel penanda untuk melacak pengaktifan

    document.querySelector('#search-button').addEventListener('click', function () {
        var movieList = document.querySelector('#movie-list');
        movieList.innerHTML = ''; // Membersihkan daftar film sebelum menampilkan hasil pencarian baru

        var searchInput = document.querySelector('#search-input').value;
        var apiUrl = 'http://omdbapi.com?apikey=1aa76861&s=' + searchInput;
        currentPage = 1; // Set currentPage ke 1 pada pencarian baru
        fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                if (result.Response == "True") {
                    if (!sudahDiaktifkan) { // Periksa jika belum diaktifkan
                        jarakMargin.classList.toggle('display-none');
                        btnNextRev.classList.toggle('display-none');
                        sudahDiaktifkan = true; // Perbarui variabel penanda
                    }
                    var movies = result.Search;
                    cardsPerPage = 5;
                    movies.forEach(function (data) {
                        var movieElement = document.createElement('div');
                        movieElement.classList.add('box-penjualan');
                        movieElement.innerHTML = `
                            <div class="image">
                                <img src="${data.Poster}" alt="">
                                <div class="icons">
                                    <a href="#" class="fas fa-heart"></a>
                                    <a href="#" class="cart-btn">read more</a>
                                    <a href="#" class="fas fa-share"></a>
                                </div>
                            </div>
                            <div class="content">
                                <h3>${data.Title}</h3>
                                <div class="price">${data.Year}</div>
                            </div>
                        `;
                        movieList.appendChild(movieElement);
                    });

                    cards = document.querySelectorAll('.box-penjualan'); // Perbarui variabel cards
                    totalCards = cards.length;
                    totalPages = Math.ceil(totalCards / cardsPerPage);
                    showPage(currentPage);
                    updatePagination();
                } else {
                    movieList.innerHTML = `<h1>${result.Error}</h1>`;
                    totalPages = 1;
                    showPage(currentPage);
                    updatePagination();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });



    var currentPage = 1;
    var cardsPerPage = 2;
    var cards = document.querySelectorAll('.box-penjualan');
    var totalCards = cards.length;
    var totalPages = Math.ceil(totalCards / cardsPerPage);

    function showPage(page) {
        var start = (page - 1) * cardsPerPage;
        var end = start + cardsPerPage;

        for (var i = 0; i < cards.length; i++) {
            if (i >= start && i < end) {
                cards[i].style.display = 'block';
            } else {
                cards[i].style.display = 'none';
            }
        }
    }

    function updatePagination() {
        var prevLink = document.querySelector('.prev');
        var nextLink = document.querySelector('.next');
        var pages = document.querySelector('.pages');

        if (currentPage === 1) {
            prevLink.style.display = 'none';
        } else {
            prevLink.style.display = 'inline-block';
        }

        if (currentPage === totalPages) {
            nextLink.style.display = 'none';
        } else {
            nextLink.style.display = 'inline-block';
        }

        if (totalPages <= 1) {
            pages.style.display = 'none';
        } else {
            pages.style.display = 'block';

            var startPage = 1;
            var endPage = totalPages;

            if (totalPages > 3) {
                if (currentPage <= 2) {
                    endPage = 3;
                } else if (currentPage >= totalPages - 1) {
                    startPage = totalPages - 2;
                } else {
                    startPage = currentPage - 1;
                    endPage = currentPage + 1;
                }
            }

            var pageLinks = '';

            for (var i = startPage; i <= endPage; i++) {
                if (i === currentPage) {
                    pageLinks += '<a class="active" disabled>' + i + '</a>';
                } else {
                    pageLinks += '<a class="page-link" data-page="' + i + '">' + i + '</a>';
                }
            }

            pages.innerHTML = pageLinks;

            var pageLinks = document.querySelectorAll('.page-link');
            pageLinks.forEach(function (link) {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    var page = parseInt(this.dataset.page);
                    if (!this.classList.contains('active')) {
                        navigateToPage(page);
                    }
                });
            });
        }
    }

    function navigateToPage(page) {
        currentPage = page;
        showPage(currentPage);
        updatePagination();
    }

    function navigateToPrev() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePagination();
        }
    }

    function navigateToNext() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            updatePagination();
        }
    }

    showPage(currentPage);
    updatePagination();

    var prevLink = document.querySelector('.prev');
    var nextLink = document.querySelector('.next');
    prevLink.addEventListener('click', navigateToPrev);
    nextLink.addEventListener('click', navigateToNext);

    var pageLinks = document.querySelectorAll('.pages a');
    pageLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var page = parseInt(this.innerHTML);
            navigateToPage(page);
        });
    });




    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Mendengarkan tombol Enter pada input teks
    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Mencegah form dikirim secara default
            searchButton.click(); // Memicu klik pada tombol Cari
        }
    });

    // Mendengarkan klik pada tombol Cari
    searchButton.addEventListener('click', function () {
        performSearch();
    });

    // Fungsi untuk melakukan pencarian
    function performSearch() {
        const searchText = searchInput.value;
        // Lakukan aksi pencarian sesuai kebutuhan Anda
        console.log('Melakukan pencarian:', searchText);
    }


});