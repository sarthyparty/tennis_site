import React from 'react';

function Links() {
  return (
    <div className="Contact">
      <article>
          <h1>Links</h1>
          <br/>
          <div class="iframe">
            <h2>Calendar</h2>
            <br/>
            <iframe src="https://www.lakeconference.org/g5-bin/client.cgi?cwellOnly=1&G5statusflag=view&schoolname=&school_id=3&G5button=13&G5genie=23&vw_schoolyear=1&vw_agl=879-3-482,&manual_access=1" />
          </div>
          <br/>
          <div class="iframe">
            <h2>MyUTR</h2>
            <br/>
            <iframe src="https://www.universaltennis.com/" />
          </div>
          
        </article>
    </div>
  );
}

export default Links;

