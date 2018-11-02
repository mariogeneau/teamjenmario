// ==============================
let global_result;
// ==============================
$(function() {
  $("#send_button_id").click(sendButton);
  $("#update_button_id").click(updateButton);
  $("#reset_button_id").click(resetButton);
  loadJsonData();
});
// ==============================
const sendButton = () => {
  if ($("#message_textarea_id").val() == "") { return; }
  loadJsonData();
  $("#timeline_str_to_return").val("");
  let localtime = moment().format('YYYY-MM-DD HH:mm:ss');
  global_result[localtime] = `MAD - ${$("#message_textarea_id").val()}`;
  $.post({url: '../android.php', data:global_result,
       success: function(response){console.log(response);}
  });
  loadJsonData();
  $("#message_textarea_id").val("");
  setTimeout(function(){
    window.location.reload(1);
  }, 1000);
};
// ==============================
const resetButton = () => {
  if (confirm('Really want to reset everything?')) {
    $("#timeline_textarea_id").val("");
    global_result = {"©TeamJenMario": "©TeamJenMario"};
    $.post({url: '../android.php', data:global_result,
         success: function(response){console.log(response);}
    });
    $("#message_textarea_id").val("");
  }
};
// ==============================
const updateButton = () => {
  loadJsonData();
  window.location.reload(1);
};
// ==============================
const loadJsonData = () => {
  $("#timeline_textarea_id").val("");
  $.getJSON("../timeline.json", function(result){
    global_result = result;
    const timeline_data = createTimeline();
    $("#timeline_textarea_id").val(timeline_data);
  });
};
// ==============================
const sortObject = (o) => {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}
// ==============================
const createTimeline = () => {
  global_result = sortObject(global_result);
  let the_dates = Object.keys(global_result);
  let the_messages = Object.values(global_result);
  for (let i in the_dates) {
    if (the_dates[i] === "©TeamJenMario") {
      the_dates.splice(i, 1);
      the_messages.splice(i, 1);
      delete global_result["©TeamJenMario"];
      $.post({url: '../android.php', data:global_result,
           success: function(response){console.log(response);}
      });
      break;
    }
  }
  the_dates.reverse();
  the_messages.reverse();
  let timeline_str_to_return = "";
  for (let i = 0; i < the_dates.length; i++) {
    timeline_str_to_return += `${the_dates[i]} : \n\n`;
    timeline_str_to_return += `${the_messages[i]}\n\n--------------------------------------\n`;
  }
  return timeline_str_to_return;
};
// ==============================














