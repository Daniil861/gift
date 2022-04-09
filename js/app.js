(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) document.querySelector(".check").textContent = sessionStorage.getItem("money"); else {
        sessionStorage.setItem("money", 5e3);
        document.querySelector(".check").textContent = sessionStorage.getItem("money");
    }
    if (document.querySelector(".monster") || document.querySelector(".cards")) {
        document.querySelector(".footer-monster__coins").textContent = 50;
        sessionStorage.setItem("current-bet", 50);
    }
    if (document.querySelector(".shop")) {
        if ("true" == sessionStorage.getItem("shirt-2")) document.querySelectorAll(".shop__button").forEach((el => {
            if (2 == el.dataset.shirt) {
                el.parentElement.classList.add("_buyed");
                el.innerHTML = "<p>select</p>";
                if (2 == sessionStorage.getItem("current-shirt")) {
                    remove_class("_target", ".shop__item");
                    el.parentElement.classList.add("_target");
                }
            }
        }));
        if ("true" == sessionStorage.getItem("shirt-3")) document.querySelectorAll(".shop__button").forEach((el => {
            if (3 == el.dataset.shirt) {
                el.parentElement.classList.add("_buyed");
                el.innerHTML = "<p>select</p>";
                if (3 == sessionStorage.getItem("current-shirt")) {
                    remove_class("_target", ".shop__item");
                    el.parentElement.classList.add("_target");
                }
            }
        }));
        if ("true" == sessionStorage.getItem("shirt-4")) document.querySelectorAll(".shop__button").forEach((el => {
            if (4 == el.dataset.shirt) {
                el.parentElement.classList.add("_buyed");
                el.innerHTML = "<p>select</p>";
                if (4 == sessionStorage.getItem("current-shirt")) {
                    remove_class("_target", ".shop__item");
                    el.parentElement.classList.add("_target");
                }
            }
        }));
    }
    if (document.querySelector(".card") || document.querySelector(".monster")) sessionStorage.setItem("current-bet", 50);
    if (document.querySelector(".card")) {
        if (!sessionStorage.getItem("current-shirt")) sessionStorage.setItem("current-shirt", 1);
        get_and_write_shirt();
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    let score = document.querySelector(".check");
    let rate_monster_win = document.querySelector(".play__rate");
    let money_monster_win = document.querySelector(".play__count");
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".acces-preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
        }
        if (targetElement.closest(".shop__button") && 1 == targetElement.closest(".shop__button").dataset.shirt) {
            sessionStorage.setItem("current-shirt", 1);
            remove_class("_target", ".shop__item");
            targetElement.closest(".shop__item").classList.add("_target");
        }
        if (targetElement.closest(".shop__button") && 2 == targetElement.closest(".shop__button").dataset.shirt) if ("true" == sessionStorage.getItem("shirt-2")) {
            sessionStorage.setItem("current-shirt", 2);
            remove_class("_target", ".shop__item");
            targetElement.closest(".shop__item").classList.add("_target");
        } else {
            let current_money = +sessionStorage.getItem("money");
            if (current_money >= 15e3) {
                delete_money(15e3);
                sessionStorage.setItem("shirt-2", true);
                change_color_button(targetElement.closest(".shop__item"), targetElement.closest(".shop__button"));
            } else no_money();
        }
        if (targetElement.closest(".shop__button") && 3 == targetElement.closest(".shop__button").dataset.shirt) if ("true" == sessionStorage.getItem("shirt-3")) {
            sessionStorage.setItem("current-shirt", 3);
            remove_class("_target", ".shop__item");
            targetElement.closest(".shop__item").classList.add("_target");
        } else {
            let current_money = +sessionStorage.getItem("money");
            if (current_money >= 25e3) {
                delete_money(25e3);
                sessionStorage.setItem("shirt-3", true);
                change_color_button(targetElement.closest(".shop__item"), targetElement.closest(".shop__button"));
            } else no_money();
        }
        if (targetElement.closest(".shop__button") && 4 == targetElement.closest(".shop__button").dataset.shirt) if ("true" == sessionStorage.getItem("shirt-4")) {
            sessionStorage.setItem("current-shirt", 4);
            remove_class("_target", ".shop__item");
            targetElement.closest(".shop__item").classList.add("_target");
        } else {
            let current_money = +sessionStorage.getItem("money");
            if (current_money >= 4e4) {
                delete_money(4e4);
                sessionStorage.setItem("shirt-4", true);
                change_color_button(targetElement.closest(".shop__item"), targetElement.closest(".shop__button"));
            } else no_money();
        }
        if (targetElement.closest(".footer-monster__minus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            if (current_bet > 50) {
                sessionStorage.setItem("current-bet", current_bet - 50);
                document.querySelector(".footer-monster__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
        if (targetElement.closest(".footer-monster__plus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            let current_bank = +sessionStorage.getItem("money");
            if (current_bank > current_bet) {
                sessionStorage.setItem("current-bet", current_bet + 50);
                document.querySelector(".footer-monster__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
        if (targetElement.closest(".footer-monster__button_bet")) {
            add_remove_className(".footer-monster__button_bet", "_hold");
            add_remove_className(".footer-monster__controls", "_hold");
            delete_money(current_bet());
            sessionStorage.setItem("current-level", 1);
            start_monster();
        }
        if (targetElement.closest(".footer-monster__button_card")) {
            add_remove_className(".footer-monster__controls", "_hold");
            add_remove_className(".footer-monster__button_card", "_hold");
            delete_money(current_bet());
            add_remove_className(".footer-monster__button_high", "_hold");
            add_remove_className(".footer-monster__button_low", "_hold");
            start_mini_game();
        }
        if (targetElement.closest(".game-monster__item") && targetElement.closest(".game-monster__item").classList.contains("_visible")) {
            let level = get_current_level();
            let arr_current = get_arr_current_level(level);
            let arr_monsters = filter_arr(arr_current);
            get_click_arr(arr_current, arr_monsters, targetElement);
        }
        if (targetElement.closest(".footer-monster__button_high")) {
            sessionStorage.setItem("activ-mode", 1);
            add_remove_className(".footer-monster__button_high", "_hold");
            add_remove_className(".footer-monster__button_low", "_hold");
            add_remove_className(".footer-monster__button_low", "_opacity");
            document.querySelectorAll(".card__closed").forEach((el => {
                el.classList.add("_anim");
            }));
            document.querySelector(".card__field").classList.remove("_hold");
        }
        if (targetElement.closest(".footer-monster__button_low")) {
            sessionStorage.setItem("activ-mode", 2);
            add_remove_className(".footer-monster__button_high", "_hold");
            add_remove_className(".footer-monster__button_high", "_opacity");
            add_remove_className(".footer-monster__button_low", "_hold");
            document.querySelectorAll(".card__closed").forEach((el => {
                el.classList.add("_anim");
            }));
            document.querySelector(".card__field").classList.remove("_hold");
        }
        if (targetElement.closest(".card__closed")) {
            targetElement.closest(".card__closed").classList.add("_visible");
            let number = +targetElement.closest(".card__closed").dataset.number;
            sessionStorage.setItem("opened-closed-card", number);
            check_mini_game_over();
        }
    }));
    function add_remove_className(block, className) {
        if (document.querySelector(block).classList.contains(className)) document.querySelector(block).classList.remove(className); else document.querySelector(block).classList.add(className);
    }
    function remove_class(className, block) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className)) el.classList.remove(className);
        }));
    }
    function delete_money(count) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            score.classList.add("_delete-money");
            score.textContent = sessionStorage.getItem("money");
        }), 500);
        setTimeout((() => {
            score.classList.remove("_delete-money");
        }), 1500);
    }
    function no_money() {
        score.classList.add("_no-money");
        setTimeout((() => {
            score.classList.remove("_no-money");
        }), 1e3);
    }
    function change_color_button(block, button) {
        block.classList.add("_buyed");
        button.innerHTML = "<p>select</p>";
    }
    function current_bet() {
        return +sessionStorage.getItem("current-bet");
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function start_monster() {
        let level = get_current_level();
        let arr_current = get_arr_current_level(level);
        add_active_class_arr(arr_current);
        let arr_monsters = filter_arr(arr_current);
        if (level >= 1 && level <= 16) create_monster(arr_monsters, level);
    }
    function filter_arr(arr) {
        let new_arr = arr.filter((el => !el.classList.contains("game-monster__item_level")));
        return new_arr;
    }
    function get_current_level() {
        return +sessionStorage.getItem("current-level");
    }
    function get_arr_current_level(level) {
        let arr = document.querySelectorAll(".game-monster__item");
        let arr_current_level = [];
        arr.forEach((el => {
            if (el.dataset.level == level) arr_current_level.push(el);
        }));
        return arr_current_level;
    }
    function add_active_class_arr(arr) {
        arr.forEach((el => {
            el.classList.add("_visible");
        }));
    }
    function get_click_arr(arr, arr_monsters, block) {
        block.closest(".game-monster__item").classList.add("_selected");
        let child = block.closest(".game-monster__item").childNodes[0];
        let selected_item = "";
        if (void 0 != child) {
            if (child.dataset.kind) selected_item = "kind"; else if (child.dataset.bad) selected_item = "bad";
        } else selected_item = "empty";
        sessionStorage.setItem("clicked-item", selected_item);
        setTimeout((() => {
            arr.forEach((el => {
                el.classList.add("_hold");
            }));
        }), 20);
        setTimeout((() => {
            visible_monsters(arr_monsters);
        }), 1500);
        setTimeout((() => {
            check_game_over(block);
        }), 2500);
    }
    function visible_monsters(arr) {
        arr.forEach((el => {
            el.classList.add("_show-img");
            if (el.childNodes[0] && el.childNodes[0].dataset.kind) el.classList.add("_kind");
            if (el.childNodes[0] && 1 == el.childNodes[0].dataset.bad) el.classList.add("_bad");
        }));
    }
    function check_game_over(item) {
        let value = sessionStorage.getItem("clicked-item");
        let level = +sessionStorage.getItem("current-level");
        if ("empty" == value && 16 == level || "kind" == value && 16 == level) {
            let current_level_win = get_current_level();
            sessionStorage.setItem("win-level", current_level_win);
            document.querySelector(".play").classList.add("_active");
            let current_rate = check_level(+sessionStorage.getItem("win-level"));
            let win_count = +sessionStorage.getItem("current-bet") * current_rate;
            rate_monster_win.textContent = `x${current_rate}`;
            money_monster_win.textContent = win_count;
            add_money(win_count);
            sessionStorage.setItem("win-level", 0);
            item.closest(".game-monster__item").classList.add("_green");
            return false;
        }
        if ("kind" == value) {
            let current_level_win = get_current_level();
            sessionStorage.setItem("win-level", current_level_win);
            sessionStorage.setItem("current-level", +sessionStorage.getItem("current-level") + 1);
            sessionStorage.setItem("clicked-item", "");
            item.closest(".game-monster__item").classList.add("_green");
            return start_monster();
        }
        if ("bad" == value) {
            item.closest(".game-monster__item").classList.add("_red");
            document.querySelector(".play").classList.add("_active");
            if (sessionStorage.getItem("win-level")) {
                let current_rate = check_level(+sessionStorage.getItem("win-level"));
                let win_count = +sessionStorage.getItem("current-bet") * current_rate;
                rate_monster_win.textContent = `x${current_rate}`;
                money_monster_win.textContent = win_count;
                add_money(win_count);
                sessionStorage.setItem("win-level", 0);
            } else {
                rate_monster_win.textContent = "0";
                money_monster_win.textContent = "0";
            }
        }
        if ("empty" == value) {
            item.closest(".game-monster__item").classList.add("_green");
            sessionStorage.setItem("current-level", +sessionStorage.getItem("current-level") + 1);
            sessionStorage.setItem("clicked-item", "");
            return start_monster();
        }
        sessionStorage.setItem("clicked-item", "");
    }
    function add_money(summ) {
        document.querySelector(".check").textContent = +sessionStorage.getItem("money") + summ;
        document.querySelector(".check").classList.add("_anim-add-money");
        sessionStorage.setItem("money", +sessionStorage.getItem("money") + summ);
    }
    function check_level(level) {
        let rate = 0;
        if (1 == level) rate = 1; else if (2 == level) rate = 2; else if (3 == level) rate = 5; else if (4 == level) rate = 10; else if (5 == level) rate = 15; else if (6 == level) rate = 32; else if (7 == level) rate = 42; else if (8 == level) rate = 53; else if (9 == level) rate = 60; else if (10 == level) rate = 63; else if (11 == level) rate = 70; else if (12 == level) rate = 75; else if (13 == level) rate = 80; else if (14 == level) rate = 90; else if (15 == level) rate = 120; else if (16 == level) rate = 160;
        return rate;
    }
    let current_arr_monst = [];
    function get_random_numbers_arr(mn, mx) {
        if (0 == current_arr_monst.length) {
            let num1 = get_random(mn, mx);
            current_arr_monst.push(num1);
        }
        if (1 == current_arr_monst.length) {
            let num2 = get_random(mn, mx);
            if (true == current_arr_monst.includes(num2)) return get_random_numbers_arr(0, 4);
            current_arr_monst.push(num2);
        }
        if (2 == current_arr_monst.length) {
            let num3 = get_random(mn, mx);
            if (true == current_arr_monst.includes(num3)) return get_random_numbers_arr(0, 4);
            current_arr_monst.push(num3);
        }
        return current_arr_monst;
    }
    function create_monster(arr, level) {
        let heroes_kind = [ "img/game-1/good-monster-1.png", "img/game-1/good-monster-2.png" ];
        let heroes_bad = [ "img/game-1/bad-monster-1.png", "img/game-1/bad-monster-2.png" ];
        let hero_1 = document.createElement("img");
        let hero_2 = document.createElement("img");
        let hero_3 = document.createElement("img");
        let num1 = get_random(0, 2);
        current_arr_monst = [];
        let arr_random = get_random_numbers_arr(0, 4);
        if (level >= 1 && level <= 6) {
            hero_1.setAttribute("data-kind", "1");
            hero_1.setAttribute("src", "img/game-1/good-monster-1.png");
            hero_2.setAttribute("data-kind", "1");
            hero_2.setAttribute("src", "img/game-1/good-monster-2.png");
            hero_3.setAttribute("data-bad", "1");
            hero_3.setAttribute("src", heroes_bad[num1]);
            arr[arr_random[0]].append(hero_1);
            arr[arr_random[1]].append(hero_2);
            arr[arr_random[2]].append(hero_3);
        } else if (level >= 7 && level <= 12) {
            hero_1.setAttribute("data-kind", "1");
            hero_1.setAttribute("src", heroes_kind[num1]);
            hero_2.setAttribute("data-bad", "1");
            hero_2.setAttribute("src", heroes_bad[num1]);
            arr[arr_random[0]].append(hero_1);
            arr[arr_random[1]].append(hero_2);
        } else if (level >= 13) {
            hero_1.setAttribute("data-bad", "1");
            hero_1.setAttribute("src", "img/game-1/bad-monster-1.png");
            hero_2.setAttribute("data-bad", "1");
            hero_2.setAttribute("src", "img/game-1/bad-monster-2.png");
            hero_3.setAttribute("data-kind", "1");
            hero_3.setAttribute("src", heroes_kind[num1]);
            arr[arr_random[0]].append(hero_1);
            arr[arr_random[1]].append(hero_2);
            arr[arr_random[2]].append(hero_3);
        }
    }
    let card_current_arr = [];
    function start_mini_game() {
        document.querySelector(".card__field").classList.add("_visible");
        let current_card1_arr = get_random_number();
        let current_card2_arr = get_random_number();
        let current_card3_arr = get_random_number();
        let current_card4_arr = get_random_number();
        let game_arr = [ current_card1_arr, current_card2_arr, current_card3_arr, current_card4_arr ];
        create_write_card(game_arr, 0, ".card__opened");
        create_write_card(game_arr, 1, ".card__new-card_1");
        create_write_card(game_arr, 2, ".card__new-card_2");
        create_write_card(game_arr, 3, ".card__new-card_3");
        write_attribute_items_cards(game_arr);
        sessionStorage.setItem("opened-card", game_arr[0]);
        setTimeout((() => {
            document.querySelector(".footer-monster__button_high").classList.add("_anim");
            document.querySelector(".footer-monster__button_low").classList.add("_anim");
        }), 2e3);
        setTimeout((() => {
            document.querySelector(".footer-monster__button_high").classList.remove("_anim");
            document.querySelector(".footer-monster__button_low").classList.remove("_anim");
        }), 3e3);
    }
    function get_random_number() {
        let card = get_random(2, 14);
        if (card_current_arr.includes(card)) return get_random_number();
        card_current_arr.push(card);
        return card;
    }
    function create_write_card(arr, count, item) {
        let card = arr[count];
        let block = document.createElement("img");
        block.setAttribute("src", `img/game-2/card-${card}.png`);
        block.setAttribute("data-number", card);
        block.setAttribute("alt", "Image");
        document.querySelector(item).append(block);
    }
    function check_mini_game_over() {
        let open_card = +sessionStorage.getItem("opened-card");
        let opened_closed_card = +sessionStorage.getItem("opened-closed-card");
        if (open_card < opened_closed_card && 1 == +sessionStorage.getItem("activ-mode")) setTimeout((() => {
            document.querySelector(".win").classList.add("_active");
            let bet = +sessionStorage.getItem("current-bet");
            let count = 2 * bet;
            document.querySelector(".win__text").textContent = count;
            add_money(count);
        }), 1500); else if (open_card < opened_closed_card && 2 == +sessionStorage.getItem("activ-mode")) setTimeout((() => {
            document.querySelector(".loose").classList.add("_active");
        }), 1500); else if (open_card > opened_closed_card && 1 == +sessionStorage.getItem("activ-mode")) setTimeout((() => {
            document.querySelector(".loose").classList.add("_active");
        }), 1500); else if (open_card > opened_closed_card && 2 == +sessionStorage.getItem("activ-mode")) setTimeout((() => {
            document.querySelector(".win").classList.add("_active");
            let bet = +sessionStorage.getItem("current-bet");
            let count = 2 * bet;
            document.querySelector(".win__text").textContent = count;
            add_money(count);
        }), 1500);
    }
    function write_attribute_items_cards(arr) {
        document.querySelector(".card__closed_1").setAttribute("data-number", arr[1]);
        document.querySelector(".card__closed_2").setAttribute("data-number", arr[2]);
        document.querySelector(".card__closed_3").setAttribute("data-number", arr[3]);
    }
    function get_and_write_shirt() {
        let current_shirt = +sessionStorage.getItem("current-shirt");
        let shirt_1 = document.createElement("img");
        let shirt_2 = document.createElement("img");
        let shirt_3 = document.createElement("img");
        let shirt_4 = document.createElement("img");
        let shirt_5 = document.createElement("img");
        let shirt_6 = document.createElement("img");
        shirt_1.setAttribute("src", `img/shop/shirt-${current_shirt}.jpg`);
        shirt_2.setAttribute("src", `img/shop/shirt-${current_shirt}.jpg`);
        shirt_3.setAttribute("src", `img/shop/shirt-${current_shirt}.jpg`);
        shirt_4.setAttribute("src", `img/shop/shirt-${current_shirt}.jpg`);
        shirt_5.setAttribute("src", `img/shop/shirt-${current_shirt}.jpg`);
        shirt_6.setAttribute("src", `img/shop/shirt-${current_shirt}.jpg`);
        document.querySelector(".card__closed_1").appendChild(shirt_1);
        document.querySelector(".card__closed_2").appendChild(shirt_2);
        document.querySelector(".card__closed_3").appendChild(shirt_3);
        document.querySelector(".card__image-1").appendChild(shirt_4);
        document.querySelector(".card__image-2").appendChild(shirt_5);
        document.querySelector(".card__image-3").appendChild(shirt_6);
    }
    window["FLS"] = true;
    isWebp();
})();