from django.core.management.base import BaseCommand
from django.conf import settings
from PIL import Image
import os
import logging

pillow_png_logger = logging.getLogger('PIL')
pillow_png_logger.setLevel(logging.ERROR)


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('--append', action='store_true',
                            help='Don\'t overwrite existing images')

    def handle(self, *args, **options):
        append_mode = False
        if options['append']:
            self.stdout.write('Creating compressed images for the frontend...')
            append_mode = True
        else:
            self.stdout.write('Creating compressed images for the frontend...')

        # Use the `limit` variable to limit the number of images processed
        # for debugging purposes.
        counter = 0
        limit = 1500000
        for dirpath, dirnames, filenames in os.walk(os.path.join(settings.FRONTEND_DIR, 'src/assets/imgs')):
            if dirpath.endswith('originals'):
                for filename in filenames:
                    # Limit the number of images that we compress for testing / debugging purposes.
                    if counter > limit:
                        break
                    counter += 1

                    if filename.endswith('.png') or filename.endswith('.jpg'):
                        # Write the compressed image to the parent directory.
                        self.write_compressed_image_to_parent_directory(dirpath,
                                                                        filename,
                                                                        append_mode)
                    elif filename.endswith('.mov'):
                        self.stdout.write('Converting mov file: ' + filename)
                        # TODO convert the file to an mpeg and put the mpeg file in the parent directory.
                        pass

        self.stdout.write('Finished creating compressed images...')

    # Compresses an image and then writes the new image
    # to the original image's parent directory.
    def write_compressed_image_to_parent_directory(self, dirpath, filename, append_mode=False):
        if not '.' in filename:
            self.stderr.write(
                'Error: <filename> must include the original file extension (.png, .jpg, etc...)')

        compressed_image_filename = filename.split('.')[0]
        compressed_image_filepath = os.path.join(dirpath, '..',
                                                 compressed_image_filename)

        try:
            with Image.open(os.path.join(dirpath, filename)) as img:
                # Only overwrite existing jp2 images if we're not in append mode.
                if not append_mode or not os.path.exists(compressed_image_filepath + '.jp2'):
                    # JPEG2000 quality layers are super dope. 0 = lossless, 500 = super dank
                    # The browser will theoretically load each layer successively (although I
                    # haven't gotten this feature to work yet).
                    self.stdout.write('Converting image to jp2: ' +
                                      compressed_image_filename)
                    img.save(compressed_image_filepath + '.jp2', 'JPEG2000',
                             quality_layers=[30, 50, 100, 250, 500])
                    # [500, 250, 100, 50, 25]

                    # Uncomment this code to delete old files.
                    # if os.path.exists(compressed_image_filepath + '.jp2'):
                    #     os.remove(compressed_image_filepath + '.jp2')
                # Only overwrite existing png images if we're not in append mode.
                if not append_mode or not os.path.exists(compressed_image_filepath + '.png'):
                    self.stdout.write('Converting image to png: ' +
                                      compressed_image_filename)
                    compressed_img = img.reduce(2)
                    compressed_img.save(compressed_image_filepath + '.png',
                                        'PNG')
                    # Uncomment this code to delete old files.
                    # if os.path.exists(compressed_image_filepath + '.png'):
                    #     os.remove(compressed_image_filepath + '.png')
        except OSError:
            self.stderr('Failed to convert file: ' +
                        os.path.join(dirpath, filename))
