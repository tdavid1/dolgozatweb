const base_url = "https://retoolapi.dev/Dw0RxP/data";

$(function() {
    listember();

    $("#ember").submit(function (e) { 
        e.preventDefault();
        const nev = $("#nev").val();
        const cim = $("#cim").val();
        const email = $("#Email").val();
        const ember = {
            nev: nev,
            cim: cim,
            email: email
        }
        if($("#név").length <=6){
            alert("Nem elég hosszú a név")
        }
        else{
            $.post(base_url, ember,
                function (data, textStatus, jqXHR) {
                    if (textStatus === "success") {
                        $("#nev").val("");
                        $("#cim").val("");
                        $("#Email").val("");
                        listember();
                    }
                },
                "json"
            );
        }
    });
});

function listember() {
    $.get(base_url, function(data, textStatus) {
        let html = "";
        data.forEach(person => {
            html += `<tr>
                <td>${person.id}</td>
                <td>${person.nev}</td>
                <td>${person.cim}</td>
                <td>${person.Email}</td>
                <td>
                <i onclick="deleteember(${person.id})" class="fa fa-remove"></i>
                </td>
            </tr>`;
        });
        $("#people-table").html(html);
    },
    "json");
}

function deleteember(emberId) {
    $.ajax({
        type: "DELETE",
        url: `${base_url}/${emberId}`,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            if (textStatus === "success") {
                listember();
            }
        }
    });
}