
$("#get").click(function (event) {
    $(this).hide();
    $(".loader").show();
    $.get("http://dummy.restapiexample.com/api/v1/employees", function(data) {
        $(".loader").hide();
        const list =createList(data.data);
        $(".result").append(list);
    });
});

function createList(dataArr){
     const list =$("<ul></ul>")
         .addClass("list-group");
     $.each(dataArr, function (i) {
         const li = $("<li></li>")
             .addClass("list-group-item")
             .text(`${dataArr[i].id}: ${dataArr[i].employee_name}. Salary: ${dataArr[i].employee_salary}`)
             .appendTo(list);
     });
    return list;
}