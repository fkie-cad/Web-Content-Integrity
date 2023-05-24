import React from 'react';
import TagList from './TagList';
import Translations from './Translations';
import Time from './Time';

class ContentMeta extends React.Component {
  render() {
    const { date, tags, translations, isBlogPost } = this.props;

    return (
      <div className="content">
        {date && <Time date={date} />}
        {date && Array.isArray(tags) && tags.length > 0 && <> &bull; </>}
        {Array.isArray(tags) && tags.length > 0 && <TagList tags={tags} />}
        {translations && <Translations translations={translations} isBlogPost={isBlogPost} />}
      </div>
    );
  }
}

export default ContentMeta;
