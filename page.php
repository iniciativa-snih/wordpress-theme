<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Merlin
 */

get_header(); ?>



	<section id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
		
			<?php if ( function_exists( 'themezee_breadcrumbs' ) ) themezee_breadcrumbs(); ?>
			
			<?php while (have_posts()) : the_post();
			
				get_template_part( 'template-parts/content', 'page' );
				
				comments_template();

			endwhile; ?>
		
		</main><!-- #main -->
	</section><!-- #primary -->
	
	<?php get_sidebar(); ?>

<?php get_footer(); ?>