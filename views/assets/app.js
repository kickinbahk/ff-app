$(".group-approved").on("change", function(event) {
  var group = $(this).data('group');
  var approval;

  if ($(this).prop('checked')) {
    approval = true;
  } else {
    approval = false;
  }

  updateGroupApproval(group, approval);
});


function updateGroupApproval(groupID, approvedStatus) {
  var data = {
    "groupID": groupID,
    "approved": approvedStatus
  }
  console.log(data.body)
  $.ajax({
    type: 'POST',
    url: '/groups/' + groupID + '/approved',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    success: function(res) { 
      console.log("Group updated")
      console.log(res)
    }
  });  
}
